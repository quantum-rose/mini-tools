const dayjs = require('dayjs');

const NOW = dayjs('2019-10-18 18:39:50').valueOf();

/**
 * 获取 openid
 */
const getOpenid = (req, res) => {
    console.log(13, req.query);
    res.send({
        res: 1,
        data: {
            openid: 'openabcde12345',
            session_key: 'sessionabcde12345'
        },
        error: ''
    });
};

/**
 * 预约直播
 */
const book = (req, res) => {
    console.log(28, req.body);
    res.send({
        res: 1,
        data: {
            // 暂无必要字段
        },
        error: ''
    });
};

/**
 * 获取服务器当前时间和直播状态
 */
const getServertime = (req, res) => {
    let time = dayjs(now);
    let liveState;

    if (time.isAfter(dayjs('2019-10-19 00:00:00'))) {
        liveState = 99;
    } else if (time.isAfter(dayjs('2019-10-18 18:45:00'))) {
        liveState = 50;
    } else if (time.isAfter(dayjs('2019-10-18 18:30:00'))) {
        liveState = 51;
    } else {
        liveState = 0;
    }

    time = time.valueOf();

    console.log(55, 'servertime ' + time);

    res.send({
        res: 1,
        data: {
            time,
            liveState
        },
        error: ''
    });
};

/**
 * 获取用户信息，是否已预约
 */
const getUserInfo = (req, res) => {
    console.log(151, req.params);
    res.send({
        res: 1,
        data: {
            hasBooked: true
        },
        error: ''
    });
};

/**
 * 提交 formId
 */
const captureFormId = (req, res) => {
    console.log(165, req.body);
    res.send({
        res: 1,
        data: {},
        error: ''
    });
};

const tutorial = (req, res) => {
    console.log(req);
};

const passport = (req, res) => {
    res.send({
        res: 1,
        data: {
            cities: [
                {
                    id: 1,
                    name: '中国澳门',
                    lockState: 10
                },
                {
                    id: 2,
                    name: '悉尼',
                    lockState: 10
                },
                {
                    id: 3,
                    name: '奥克兰',
                    lockState: 10
                },
                {
                    id: 4,
                    name: '威尼斯',
                    lockState: 10
                },
                {
                    id: 5,
                    name: '中国香港',
                    lockState: 10
                }
            ]
        },
        error: ''
    });
};

const gameResult = (req, res) => {
    console.log(req.query);
    res.send({
        res: 1,
        data: {},
        error: ''
    });
};

module.exports = {
    getOpenid,
    book,
    getServertime,
    getUserInfo,
    captureFormId,
    tutorial,
    passport,
    gameResult
};
