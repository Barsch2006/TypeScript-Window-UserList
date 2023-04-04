import User from './User';
import runCmd from './runCmd';
import get from 'prompt';
import path from 'path';
import fs from 'fs';

async function input(): Promise<string> {
    return new Promise((res, rej) => {
        try {
            get.get(["name"], (err: any, result: any) => {
                if (err) {
                    rej(err);
                } else {
                    res(result.name);
                }
            });
        } catch (err) {
            rej(err);
        }
    })
}

async function Benutzernamen(domain: boolean) {
    const output: any = await runCmd("net", `user ${domain ? " /domain" : ""}`);
    var outputLines: string[] = output.toString().split('  ');
    var users: string[] = [];
    outputLines.splice(4).filter(Boolean).forEach(async (element: string) => {
        users.push(element.trimStart().trimEnd());
    });
    users.pop();
    return users
}

async function main() {
    console.log("Domänen oder lokale Benutzer abfragen?");
    console.log("(1) Domänenbenutzer");
    console.log("(2)  lokale Benutzer");

    let selection = 0;
    let key: any;

    key = await input();
    selection = key === "1" ? 0 : selection;
    selection = key === "2" ? 1 : selection;
    let file = path.join(__dirname, 'users.json');

    const users: string[] = await Benutzernamen(selection === 0);

    for (let i = 0; i < users.length; i++) {
        let username = users[i];
        let user = new User(username, selection === 0);
        await user.parseData();
        let json = {
            username: user.username,
            name: user.name,
            class: user.class
        };
        if (fs.existsSync(file) === false) {
            fs.writeFileSync(file, '[\n');
        }

        if (i == users.length - 1) {
            fs.appendFileSync(file, JSON.stringify(json) + '\n]\n');
        } else {
            fs.appendFileSync(file, JSON.stringify(json) + ',\n');
        }
    }
}

main();
