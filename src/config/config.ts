import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    await mongoose.connect(dbUri);
    console.log('✅ MongoDB connected successfully');
    
    // Log database name for verification
    const db = mongoose.connection.db;
    if (db) {
      const dbName = db.databaseName;
      console.log(`📦 Connected to database: ${dbName}`);
    } else {
      console.warn('⚠️ Unable to retrieve database name: connection.db is undefined');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Add event listeners for connection status
mongoose.connection.on('disconnected', () => {
  console.log('🔌 MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});
