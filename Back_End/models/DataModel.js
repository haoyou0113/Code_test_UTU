import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  Currency: { type: String, required: true },
  Date: { type: Date, required: true },
  High: { type: Number, required: true },
  Low: { type: Number, required: true },
  Close: { type: Number, required: true },
  Volume: { type: Number, required: true },
  'Market Cap': { type: Number, required: true },
});
const DataModel = mongoose.model('data', DataSchema);

export default DataModel;
