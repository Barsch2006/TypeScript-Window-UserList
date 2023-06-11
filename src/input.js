const { get } = require('prompt');

async function input(name) {
    return new Promise((res, rej) => {
        try {
            get([name], (err, result) => {
                if (err) {
                    rej(err);
                } else {
                    res(result[name]);
                }
            });
        } catch (err) {
            rej(err);
        }
    })
}

module.exports = input;
