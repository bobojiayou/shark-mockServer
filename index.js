var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();
var router = express.Router();

var mockData = require('./generate/index.js');

router.use('/', function (req, res, next) {
    var mockfile = path.join(__dirname, req.path);
    if (fs.existsSync(mockfile)) {
        var temple = fs.readFileSync(mockfile, 'utf-8');
        var resData = mockData.entry(JSON.parse(temple), req.query);
        res.send(resData);
    } else {
        res.send("无效请求路径");
    }
});

app.use(router).listen(3000);
