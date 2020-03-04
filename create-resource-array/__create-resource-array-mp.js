/**
 * 创建项目所需的图片预加载列表，适用于微信小程序
 *
 * 需在 node 环境中运行！
 * 本工具会读取当前目录下所有图片类文件的名称，并输出到目标文件中
 * 输出文件的内容为 js 代码
 * 示例：“module.exports = [https://cdn.com/ + 'imgs/loading.png']”
 * 因此可供其他 js 文件以符合 commonjs 模块化规范的方式引入
 */

const fs = require('fs');
const path = require('path');

// cdn 地址
const cdnUrl = 'https://cdn.com';
// 输出文件的路径
const outputFile = path.join('D:/wxminiprogram/utils/resource-array-loading.js');
const dirname = __dirname.split('\\').pop();

fs.readdir(__dirname, (err, files) => {
    if (err) throw err;

    let imgs = files
        .filter(item => /\.jpg|png|gif|bmp$/.test(item))
        .map(item => `'${cdnUrl + dirname}/${item}'`)
        .join(',\r\n  ');

    imgs = `module.exports = [\r\n  ${imgs}\r\n]`;

    fs.writeFile(outputFile, imgs, err => {
        if (err) throw err;
        console.log('文件已被保存');
    });
});
