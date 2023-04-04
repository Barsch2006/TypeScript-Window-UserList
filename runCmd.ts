const { exec } = require("child_process");

export default async (cmd: any, args: any) => {
    return new Promise((resolve, reject) => {
        const options = {
            encoding: 'utf8',
            shell: true
        };
        const childProcess = exec(`${cmd} ${args}`, options, (err: any, stdout: any, stderr: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
        childProcess.stdin.setEncoding('utf8');
    });
}