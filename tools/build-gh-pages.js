/**
 * @file 编译gh-pages脚本，目前只是简单的copy文件
 * @author fe.xiaowu@gmail.com
 * @todo
 *     1. 文件编译：混淆、合并、压缩
 *     2. 编译`docs`文件
 *     3. 自动生成demo路径和图
 */

var child = require('child_process');

console.log('build start!');
child.execSync([
    'rm -rf gh-pages',
    'mkdir gh-pages',
    'cp -rf docs gh-pages/',
    'cp -rf deps gh-pages/',
    'cp -rf src gh-pages/',
    'cp -rf test gh-pages/',
    'cp -rf favicon.ico gh-pages/',
    'cp -rf index.html gh-pages/',
    'cp -rf README.md gh-pages/'
].join(' && '));
console.log('build end!');
