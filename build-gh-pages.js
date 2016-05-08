var child = require('child_process');

console.log('build start!');
child.execSync([
    'rm -rf gh-pages',
    'mkdir gh-pages',
    'cp -rf docs gh-pages/',
    'cp -rf lib gh-pages/',
    'cp -rf src gh-pages/',
    'cp -rf test gh-pages/',
    'cp -rf index.html gh-pages/'
].join(' && '));
console.log('build end!');
