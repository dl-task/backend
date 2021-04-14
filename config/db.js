const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://jack1234:12345@cluster0.fbccp.mongodb.net/dl_task?retryWrites=true&w=majority', {
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