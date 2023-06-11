const runCmd = require('./runCmd');
const { config } = require('dotenv');
config();

class User {
    username;
    domain
    name;
    class;
    ready;

    constructor(username, domain) {
        this.username = username;
        this.domain = domain;
        this.name = null;
        this.class = null;
        this.ready = false;
    }

    async parseData() {
        const userData = await runCmd("net", `user ${this.username}${this.domain ? " /domain" : ""}`);
        const name = await BenutzerName(userData);
        const userClass = await BenutzerKlasse(userData);

        this.name = name;
        this.class = userClass;
        this.ready = true;
    }
}

async function BenutzerKlasse(output) {
    const queryString = process.env.CLASS_QUERY ?? "Globale Gruppenmitgliedschaften";
    const outputLines = output.split("\n").map((line) => line.trim());
    const userinfo = outputLines.find((line) => line.startsWith(queryString));

    if (!userinfo || userinfo.substring(queryString.length).trim() == process.env.RETURN_NULL_CLASS) {
        return null;
    }

    return userinfo.substring(queryString.length).trim();
}

async function BenutzerName(output) {
    const queryString = process.env.NAME_QUERY ?? "Vollst�ndiger Name";
    const outputLines = output.split("\n").map((line) => line.trim());
    const userinfo = outputLines.find((line) => line.startsWith(queryString));

    if (!userinfo) {
        return null;
    }

    return userinfo.substring(queryString.length).trim();
}

module.exports = User;
