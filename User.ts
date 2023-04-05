import runCmd from './runCmd';

export default class User {
    username: string;
    domain: boolean
    name: string | null;
    class: string | null;
    ready: boolean | null

    constructor(username: string, domain: boolean) {
        this.username = username;
        this.domain = domain;
        this.name = null;
        this.class = null;
        this.ready = false;
    }

    async parseData() {
        const name: string | null = await BenutzerName(this.username, this.domain);
        const userClass: string | null = await BenutzerKlasse(this.username, this.domain);

        this.name = name;
        this.class = userClass;
        this.ready = true;
    }
}

async function BenutzerKlasse(username: string, domain: boolean) {
    const output: string = await runCmd("net", `user ${username}${domain ? " /domain" : ""}`);

    const outputLines: string[] = output.split("\n").map((line: any) => line.trim());
    const userinfo: string | undefined = outputLines.find((line: any) => line.startsWith("Globale Gruppenmitgliedschaften"));

    if (!userinfo || userinfo.substring("Globale Gruppenmitgliedschaften".length).trim() == "*Kein") {
        return null;
    }

    return userinfo.substring("Globale Gruppenmitgliedschaften".length).trim();
}

async function BenutzerName(username: string, domain: boolean) {
    const output: string = await runCmd("net", `user ${username} ${domain ? " /domain" : ""}`);

    const outputLines: string[] = output.split("\n").map((line: string) => line.trim());
    const userinfo = outputLines.find((line: string) => line.startsWith("Vollst�ndiger Name"));

    if (!userinfo) {
        return null;
    }

    return userinfo.substring("Vollst�ndiger Name".length).trim();
}