import data from './rawData.js';
import { initData } from './utils/index.js';

const newData = initData(data.datalist);
export default {
  datalist: newData,
};
