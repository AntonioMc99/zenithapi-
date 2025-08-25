const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not set in environment variables.');
  }

  try {
    await mongoose.connect(uri);
    const { host, name } = mongoose.connection;
    console.log(`MongoDB connected: ${host}/${name}`);

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.error('MongoDB disconnected');
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    throw err;
  }
}

module.exports = connectDB;

