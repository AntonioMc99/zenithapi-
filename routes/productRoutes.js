const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { isValidObjectId } = require('mongoose');

// CREATE
router.post('/', async (req, res) => {
  try {
    const doc = await Product.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: 'ValidationError', message: err.message, details: err.errors });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ error: 'BadRequest', message: 'Invalid product id' });
  const doc = await Product.findById(id);
  if (!doc) return res.status(404).json({ error: 'NotFound', message: 'Product not found' });
  res.json(doc);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ error: 'BadRequest', message: 'Invalid product id' });
  try {
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'NotFound', message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'ValidationError', message: err.message, details: err.errors });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ error: 'BadRequest', message: 'Invalid product id' });
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'NotFound', message: 'Product not found' });
  res.json({ message: 'Product deleted successfully' });
});

// READ ALL + FILTERS/SORT/PAGE
router.get('/', async (req, res) => {
  const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10, tags } = req.query;
  const filter = {};

  if (category) filter.category = category;

  if (typeof tags === 'string' && tags.trim()) {
    const tagList = tags.split(',').map(s => s.trim()).filter(Boolean);
    if (tagList.length) filter.tags = { $in: tagList };
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const sortMap = {
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    createdAt_asc: { createdAt: 1 },
    createdAt_desc: { createdAt: -1 },
    name_asc: { name: 1 },
    name_desc: { name: -1 },
  };
  const sort = sortMap[sortBy] || {};

  const perPage = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
  const current = Math.max(parseInt(page) || 1, 1);

  const [items, total] = await Promise.all([
    Product.find(filter).sort(sort).skip((current - 1) * perPage).limit(perPage),
    Product.countDocuments(filter),
  ]);

  res.set('X-Total-Count', String(total));
  res.set('X-Total-Pages', String(Math.ceil(total / perPage)));
  res.set('X-Page', String(current));
  res.set('X-Limit', String(perPage));
  res.json(items);
});

module.exports = router;
