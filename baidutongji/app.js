const path = require('path');
const fs = require('fs');
const iconv = require('iconv-lite');

const oneDayAgo = new Date();
oneDayAgo.setTime(oneDayAgo.getTime() - 24 * 60 * 60 * 1000);
const yesterday =
    oneDayAgo.getFullYear() +
    (oneDayAgo.getMonth() + 1 + '').padStart(2, '0') +
    (oneDayAgo.getDate() + '').padStart(2, '0');

const twoDaysAgo = new Date();
twoDaysAgo.setTime(twoDaysAgo.getTime() - 48 * 60 * 60 * 1000);
const theDayBeforeYesterday =
    twoDaysAgo.getFullYear() +
    (twoDaysAgo.getMonth() + 1 + '').padStart(2, '0') +
    (twoDaysAgo.getDate() + '').padStart(2, '0');

const f1 = fs.readFileSync(path.join(__dirname, `./历史总和/事件分析_20200115-${theDayBeforeYesterday}.csv`));
const f2 = fs.readFileSync(path.join(__dirname, `./每日统计/事件分析_${yesterday}-${yesterday}.csv`));

json2csv(getTongjiSum(csv2json(f1), csv2json(f2)));

function csv2json(csv) {
    let _json = {};
    iconv
        .decode(csv, 'gbk') // 以 gbk 方式解码
        .replace(/(?<=\d{1,3}),(?=\d{3})/g, '') // 去掉千位分隔符
        .replace(/\d+,/g, '') // 去掉可能存在的纯数字单元格，其实就是第一列，这一列无意义，每次从百度导出的 csv 文件都不一样
        .replace(/"/g, '') // 去掉双引号
        .replace(/\r\n/g, '\n') // 替换可能存在的换行符
        .split('\n') // 按行拆解行
        .slice(1) // 去掉表头，表头要改，我们自己写
        .filter(item => item !== '') // 去掉可能存在的空行
        .map(
            item =>
                item
                    .split(',') // 按逗号拆解列
                    .map(item => (item === '--' ? 0 : /^\d+$/.test(item) ? parseInt(item) : item)) // 字符串转数字
        )
        .forEach(item => {
            _json[item[0]] = [item[1], item[2], item[3]]; // 导出以 事件ID 为键名的对象
        });
    return _json;
}

function json2csv(json) {
    let _dataArray = ['"事件ID","事件名称","触发总用户数","触发总次数"'];
    for (key in json) {
        let eventID = key;
        let eventName = json[key][0];
        let userAmount = json[key][1];
        userAmount = userAmount === 0 ? '--' : userAmount.toString().replace(/(?<=^\d+)(?=(\d{3})+$)/g, ','); // 添加千位分隔符
        let triggerAmount = json[key][2];
        triggerAmount = triggerAmount === 0 ? '--' : triggerAmount.toString().replace(/(?<=^\d+)(?=(\d{3})+$)/g, ','); // 添加千位分隔符

        _dataArray.push(`"${eventID}","${eventName}","${userAmount}","${triggerAmount}"`);
    }
    let _fileName = path.join(__dirname, `./历史总和/事件分析_20200115-${yesterday}.csv`);
    let _dataBuffer = iconv.encode(_dataArray.join('\n'), 'gbk');
    fs.writeFile(_fileName, _dataBuffer, err => {
        if (err) throw err;
        console.log('文件已保存！', _fileName);
    });
}

function getTongjiSum(json1, json2) {
    let _result = {};
    for (key in json1) {
        _result[key] = [json1[key][0], json1[key][1] + json2[key][1], json1[key][2] + json2[key][2]];
    }
    return _result;
}
