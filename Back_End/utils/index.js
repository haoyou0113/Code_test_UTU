export const initData = (arr) => {
  // convert raw data
  return arr.map((i) => ({
    Currency: i.Currency,
    Date: parserDate(i.Date).getTime(),
    Open: parseFloat(i.Open.replace(/,/g, '')),
    High: parseFloat(i.High.replace(/,/g, '')),
    Low: parseFloat(i.Low.replace(/,/g, '')),
    Close: parseFloat(i.Close.replace(/,/g, '')),
    Volume: parseFloat(i.Volume.replace(/,/g, '')),
    'Market Cap': parseFloat(i['Market Cap'].replace(/,/g, '')),
  }));
};

export const parserDate = function (date) {
  //data formate
  let t = Date.parse(date);
  if (!isNaN(t)) {
    return new Date(Date.parse(date.replace(/-/g, '/')));
  } else {
    return new Date();
  }
};

export const generateObj = (arr) => {
  let flg = {};
  for (let i = 0; i < arr.length; i++) {
    if (!flg.hasOwnProperty(arr[i].Currency)) {
      flg[arr[i].Currency] = arr[i].Close;
    }
  }

  return flg;
};
