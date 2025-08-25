const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'], trim: true },
    price: { type: Number, required: [true, 'Price is required'], min: [0.01, 'Price must be greater than 0'] },
    category: { type: String, required: [true, 'Category is required'], trim: true, index: true },
    inStock: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);

module.exports = mongoose.model('Product', productSchema);
