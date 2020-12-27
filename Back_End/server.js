import express from 'express';
import mongoose from 'mongoose';
import dataRouter from './routers/dataRouter.js';

const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/UTU', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on('connected', function () {
  console.log('Database connected');
});

mongoose.connection.on('error', function () {
  console.log('Database error');
});

mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected.');
});

app.get('/', (req, res) => {
  res.send('server in running');
});
app.use('/api/data', dataRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message }); //err catcher
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running at localhost:${port}`);
});
