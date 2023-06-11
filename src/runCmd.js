const { exec } = require("child_process");

async function runCmd (cmd, args) {
    return new Promise((resolve, reject) => {
        const options = {
            encoding: 'utf8',
            shell: true
        };
        const childProcess = exec(`${cmd} ${args}`, options, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
        childProcess.stdin.setEncoding('utf8');
    });
}

module.exports = runCmd;
