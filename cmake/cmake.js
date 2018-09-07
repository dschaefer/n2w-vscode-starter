var mkdirp = require('mkdirp');
var path = require('path');

if (process.argv.length < 3) {
    console.log('Missing build directory');
    process.exit(1);
}

const buildDir = process.argv[2];

const fs = require('fs');
const childProcess = require('child_process');

if (!fs.existsSync(buildDir)) {
    mkdirp.sync(buildDir);
}

if (!fs.existsSync(buildDir + '/CMakeCache.txt')) {
    const args = [
        '-G', 'Ninja',
        '-DCMAKE_EXPORT_COMPILE_COMMANDS=ON',
        '-DCMAKE_BUILD_TYPE=RelWithDebInfo',
        process.cwd(),
    ];
    childProcess.spawnSync('cmake', args, { cwd: buildDir, stdio: 'inherit'});
}

childProcess.spawnSync('ninja', ['-v', 'install'], { stdio: 'inherit', cwd: buildDir });
