import mongoose from 'mongoose';
const DATABASE_URI = 'mongodb://localhost:27017/entries';

mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URI);

export default mongoose;
