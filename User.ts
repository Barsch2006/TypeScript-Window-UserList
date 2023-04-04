import runCmd from './runCmd';

export default class User {
    username: string | any
    domain: any
    name: any
    class: any
    ready: boolean | any

    constructor(username: any, domain: any) {
        this.username = username;
        this.domain = domain;
        this.name = "";
        this.class = "";
        this.ready = false;
    }

    async parseData() {
        const name = await BenutzerName(this.username, this.domain) ?? null;
        const userClass = await BenutzerKlasse(this.username, this.domain) ?? null;

        this.name = name;
        this.class = userClass;
        this.ready = true;
    }
}

async function BenutzerKlasse(username: any, domain: any) {
    const output: any = await runCmd("net", `user ${username}${domain ? " /domain" : ""}`);

    const outputLines = output.split("\n").map((line: any) => line.trim());
    const userinfo = outputLines.find((line: any) => line.startsWith("Globale Gruppenmitgliedschaften"));

    if (!userinfo || userinfo.substring("Globale Gruppenmitgliedschaften".length).trim() == "*Kein") {
        return null;
    }

    return userinfo.substring("Globale Gruppenmitgliedschaften".length).trim();
}

async function BenutzerName(username: any, domain: any) {
    const output: any = await runCmd("net", `user ${username} ${domain ? " /domain" : ""}`);

    const outputLines: string[] = output.split("\n").map((line: string) => line.trim());
    const userinfo = outputLines.find((line: string) => line.startsWith("Vollst�ndiger Name"));

    if (!userinfo) {
        return null;
    }

    return userinfo.substring("Vollst�ndiger Name".length).trim();
}