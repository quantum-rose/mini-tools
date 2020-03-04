const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const router = require('./router');
const dayjs = require('dayjs');

const app = express();
const server = http.createServer(app);

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type,Content-Length,Authorization,Accept,X-Requested-With,openid'
    );
    res.header('Content-Type', 'application/json;charset=utf-8');
    if (req.method == 'OPTIONS') res.send(200);
    /* 让 options 请求快速返回 */ else next();
    next();
});

app.use(bodyParser.json());

app.use(router);

server.listen(5984, () => console.log('Express server running at http://127.0.0.1:5984'));
