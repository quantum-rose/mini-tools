/**
 * 创建项目所需的图片预加载列表，适用于h5，利用 process.env.BASE_URL 以在不同运行环境中使用不同的资源地址
 *
 * 需在 node 环境中运行！
 * 本工具会深度遍历当前目录下所有图片类文件的名称，并输出到目标文件中
 * 输出文件的内容为 js 代码
 * 示例：“export default [process.env.BASE_URL + 'imgs/loading.png']”
 * 因此可供其他 js 文件以符合 ES6 模块化规范的方式引入
 */

const fs = require('fs');
const path = require('path');

// 要排除的文件或文件夹
const EXCLUDE = /^dir1|dir2|exclude\.png$/;
// 输出文件的路径
const OUTPUT_FILE = path.join(__dirname, '../src/utils/resource-array-loading.js');

function deepReaddir(dirPath) {
    const imgs = [];
    fs.readdirSync(dirPath).forEach(item => {
        if (!EXCLUDE.test(item)) {
            if (fs.lstatSync(path.join(dirPath, item)).isDirectory()) {
                imgs.push(...deepReaddir(path.join(dirPath, item)));
            } else {
                if (/\.jpg|png|gif|bmp$/.test(item)) {
                    imgs.push(`process.env.BASE_URL + '${dirPath.replace(__dirname, '').replace(/\\/g, '/')}/${item}'`);
                }
            }
        }
    });
    return imgs;
}

const imgs = deepReaddir(__dirname);

fs.writeFile(OUTPUT_FILE, `export default [\r\n    ${imgs.join(',\r\n    ')}\r\n];`, err => {
    if (err) throw err;
    console.log('文件已被保存');
});
