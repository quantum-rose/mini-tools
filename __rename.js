/**
 * 批量重命名
 */

const fs = require('fs');
const path = require('path');

fs.readdir(__dirname, (err, files) => {
    if (err) throw err;
    let imgsName = files.filter(item => /\.jpg|png|gif|bmp$/.test(item));
    let newName = imgsName.map(item => 'macao-foreground-' + item.match(/\d+-\d+\.\w+/g));
    imgsName.forEach((item, index) => {
        fs.rename(path.join(__dirname, imgsName[index]), path.join(__dirname, newName[index]), err => {
            if (err) throw err;
            console.log('重命名完成');
        });
    });
});
