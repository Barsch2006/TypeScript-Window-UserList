const User = require('./User');
const runCmd = require('./runCmd');
const input = require('./input');
const {appendFileSync, writeFileSync, existsSync,unlinkSync} = require('fs');

async function Benutzernamen(domain) {
    const output = await runCmd("net", `user ${domain ? " /domain" : ""}`);
    var outputLines = output.toString().split('  ');
    var users = [];
    outputLines.splice(4).filter(Boolean).forEach(async (element) => {
        users.push(element.trimStart().trimEnd());
    });
    users.pop();
    return users
}

async function main() {
    try {
        console.log("Domänen oder lokale Benutzer abfragen?");
        console.log("(1) Domänenbenutzer");
        console.log("(2)  lokale Benutzer");

        let selection = 0;
        let key = "";
        while (key == "") {
            key = await input("mode");
        }

        selection = key === "1" ? 0 : selection;
        selection = key === "2" ? 1 : selection;

        let file = await input("outputFile");
        while (file == "" || parseInt(file) < 1 || parseInt(file) > 2) {
            file = await input("outputFile");
        }

        while (file.endsWith('.json') == false) {
            console.warn("The file should end with .json");
            file = await input("outputFile");
        }

        if (existsSync(file) == true) {
            unlinkSync(file);
        }

        const users = await Benutzernamen(selection === 0);

        for (let i = 0; i < users.length; i++) {
            let username = users[i];
            let user = new User(username, selection === 0);
            await user.parseData();
            let json = {
                username: user.username,
                name: user.name,
                class: user.class
            };
            if (existsSync(file) === false) {
                writeFileSync(file, '[\n');
            }

            if (i == users.length - 1) {
                appendFileSync(file, JSON.stringify(json) + '\n]\n');
            } else {
                appendFileSync(file, JSON.stringify(json) + ',\n');
            }
        }
        
        console.log('Task done!');
    } catch (err) {
        console.error(`There is an Error accoured: ${err}`);
    }
}

main();
