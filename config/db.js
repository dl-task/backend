const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		console.log('MongoDB Connected...');
  } catch (e) {
    console.error('error connecting mongodb', e);
    process.exit(1);
  }
}

module.exports = connectDB;