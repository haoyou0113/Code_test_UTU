![image](https://github.com/haoyou0113/Code_test_UTU_FrontEnd/blob/master/public/img/home.png)
![image](https://github.com/haoyou0113/Code_test_UTU_FrontEnd/blob/master/public/img/chart.png)

## `How to Start`

### Setup MongoDB

- Set MONGODB_URL=mongodb://localhost:27017/UTU

### Front end

```
$ cd  Front_End
$ npm install
$ npm start
```

The front end mainly base on React, Redux, antd, react-chartjs, axios for frameworks and libraries

### Back end

```
$ cd  Back_End
$ npm install
$ npm start
```

The back end part mainly base on Express, MongoDB

init data: call http://localhost5000/api/data/seed/init to insert date into database

API:
| Api | Type | Description |
| ---------- | :-----------: | :-----------: |
|http://localhost5000/api/data/:timestamp | Get | get initial data for table |
|http://localhost5000/api/data/seed/init | Get | seed data into database |
|http://localhost5000/api/data/chart/:data | Get | get initial data for chart according to date |
|http://localhost5000/api/data/search/:currency | Get | search the specific coin with currency |
|http://localhost5000/api/data/add | Post | generate new data |
