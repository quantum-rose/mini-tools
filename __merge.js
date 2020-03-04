/**
 * 本文件用于合并白鹭项目的打包文件，并追加cdn地址
 */

const fs = require('fs');
const path = require('path');

const cdn_url = 'https://cnd.com'

function randomNumber() {
    return Math.floor(Math.random() * Math.pow(10, 5));
}

function genNewFileName(file_name, file_tail, file_path, cdn_path) {
    let new_file_name = file_name + randomNumber() + file_tail;
    let new_file_path = path.join(file_path, new_file_name);
    let new_cdn_path = (cdn_path + '/' + new_file_name).replace(/\\/g, '/');

    return {
        name: new_file_name,
        local: new_file_path,
        cdn: new_cdn_path
    };
}

function merge(source_path, cdn_url) {
    console.log(`source_path: ${source_path}`);
    console.log(`cdn_url: ${cdn_url}`);
    // 在 source_path下生成新文件夹
    let new_folder_path = path.join(source_path, randomNumber() + '');
    fs.mkdirSync(new_folder_path);

    let json_file = JSON.parse(fs.readFileSync(path.join(source_path, 'manifest.json'), 'utf8'));

    let new_merge_file = genNewFileName('merge', '.js', new_folder_path, cdn_url);

    console.log(JSON.stringify(new_merge_file));
    let new_game_file = genNewFileName('game', '.js', new_folder_path, cdn_url);

    fs.writeFileSync(new_merge_file.local, '', 'utf8');
    json_file.initial.forEach(e => {
        let txt = fs.readFileSync(path.join(source_path, e), 'utf8');
        fs.appendFileSync(new_merge_file.local, txt + '\r\n');
    });

    fs.writeFileSync(new_game_file.local, '', 'utf8');
    json_file.game.forEach(e => {
        let txt = fs.readFileSync(path.join(source_path, e), 'utf8');
        fs.appendFileSync(new_game_file.local, txt + '\r\n');
    });

    json_file.initial = [new_merge_file.cdn];
    json_file.game = [new_game_file.cdn];

    fs.writeFileSync(path.join(new_folder_path, 'manifest.json'), JSON.stringify(json_file), 'utf8');

    console.log(`complete ${new_folder_path}`);
}

merge(__dirname, cdn_url);
