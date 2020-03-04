/**
 * 创建项目所需的图片预加载列表，适用于h5，在 webpack 环境中利用 process.env.BASE_URL 以在不同运行环境中使用不同的资源地址
 *
 * 需在 node 环境中运行！
 * 本工具会读取当前目录下所有图片类文件的名称，并输出到目标文件中
 * 输出文件的内容为 js 代码
 * 示例：“export default [process.env.BASE_URL + 'imgs/loading.png']”
 * 因此可供其他 js 文件以符合 ES6 模块化规范的方式引入
 */

const fs = require('fs');
const path = require('path');

// 输出文件的路径
const outputFile = path.join(
  __dirname,
  '../../src/util/resource-array-loading.js'
);
const dirname = __dirname.split('\\').pop();

fs.readdir(__dirname, (err, files) => {
  if (err) throw err;

  let imgs = files
    .filter(item => /\.jpg|png|gif|bmp$/.test(item))
    .map(item => `process.env.BASE_URL + '${dirname}/${item}'`)
    .join(',\r\n  ');

  imgs = `export default [\r\n  ${imgs}\r\n]`;

  fs.writeFile(outputFile, imgs, err => {
    if (err) throw err;
    console.log('文件已被保存');
  });
});
