import express from 'express';
import DataModel from '../models/DataModel.js';
import data from '../data.js';
import expressAsyncHandler from 'express-async-handler';
import { generateObj } from '../utils/index.js';
const dataRouter = express.Router();

dataRouter.get(
  '/:timestamp',

  expressAsyncHandler(async (req, res) => {
    const timestamp = parseInt(req.params.timestamp);
    const today = await DataModel.find({
      Date: { $eq: new Date(timestamp) },
    });

    const hours = await DataModel.find(
      { Date: { $eq: new Date(timestamp - 24 * 60 * 60 * 1000) } } // 24 h
    );
    const hoursClose = generateObj(hours);

    const days = await DataModel.find(
      {
        Date: { $eq: new Date(timestamp - 7 * 24 * 60 * 60 * 1000) },
      } // 7days
    );
    const daysClose = generateObj(days);

    const months = await DataModel.find(
      {
        Date: {
          $eq: new Date(req.params.timestamp - 30 * 24 * 60 * 60 * 1000),
        },
      } //  1 month
    );

    const monthsClose = generateObj(months);
    const datalist = today.map((item, index) => ({
      currency: item.Currency,
      hours: (item.Close / hoursClose[item.Currency] - 1) * 100,
      days: (item.Close / daysClose[item.Currency] - 1) * 100,
      months: (item.Close / monthsClose[item.Currency] - 1) * 100,
      Volume: item.Volume,
      MktCap: item['Market Cap'],
    }));

    res.send(datalist);
  })
);

dataRouter.get(
  //import data to Database
  '/seed/init',
  expressAsyncHandler(async (req, res) => {
    await DataModel.remove({});
    const createdDataModel = await DataModel.insertMany(data.datalist);
    res.send({ createdDataModel });
  })
);
dataRouter.get(
  //search coin with currency
  '/search/:currency',
  expressAsyncHandler(async (req, res) => {
    const dataList = await DataModel.find({ Currency: req.params.currency });
    res.send(dataList);
  })
);
dataRouter.get(
  //getting chart data
  '/chart/:data',
  expressAsyncHandler(async (req, res) => {
    const currency = req.params.data.split('&')[0];
    const timestamp = parseInt(req.params.data.split('&')[1]);
    const dataList = await DataModel.find({
      Date: {
        $gte: new Date(timestamp - 30 * 24 * 60 * 60 * 1000),
        $lte: new Date(timestamp),
      },
      Currency: currency,
    });
    res.send(dataList);
  })
);
dataRouter.post(
  '/add',
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const data = await new DataModel({
      Currency: req.body.currency,
      Date: req.body.date,
      Open: req.body.open,
      High: req.body.high,
      Low: req.body.low,
      Close: req.body.close,
      Volume: req.body.volume,
      'Market Cap': req.body.marketCap,
    });
    const createdDataModel = await data.save();
    res.send({
      _id: createdDataModel._id,
    });
  })
);

export default dataRouter;
