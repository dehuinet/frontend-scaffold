const {spawn} = require('child_process');
exports.validatePortNumber = function validatePortNumber(answer){
    const number = parseInt(answer);
    if (isNaN(number)) {
        return '端号必须是整数！';
    }
    return true;
};
exports.runCommand = function runCommand(cmd, args, options){
    return new Promise(resolve => {
        const spwan = spawn(cmd, args, Object.assign({
            cwd: process.cwd(),
            stdio: 'inherit',
            shell: true
        }, options));
        spwan.on('exit', resolve);
    });
};
