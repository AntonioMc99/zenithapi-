const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connection');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'zenith-api' });
});

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'NotFound', message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.statusCode || 500).json({ error: 'ServerError', message: err.message });
});

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
})();
