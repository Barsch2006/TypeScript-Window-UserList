import runCmd from './runCmd';
import dotenv from 'dotenv';
dotenv.config();

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
    const queryString: string = process.env.CLASS_QUERY ?? "Globale Gruppenmitgliedschaften";
    const output: string = await runCmd("net", `user ${username}${domain ? " /domain" : ""}`);

    const outputLines: string[] = output.split("\n").map((line: any) => line.trim());
    const userinfo: string | undefined = outputLines.find((line: any) => line.startsWith(queryString));

    if (!userinfo || userinfo.substring(queryString.length).trim() == process.env.RETURN_NULL_CLASS) {
        return null;
    }

    return userinfo.substring(queryString.length).trim();
}

async function BenutzerName(username: string, domain: boolean) {
    const queryString: string = process.env.NAME_QUERY ?? "Vollst�ndiger Name";
    const output: string = await runCmd("net", `user ${username} ${domain ? " /domain" : ""}`);

    const outputLines: string[] = output.split("\n").map((line: string) => line.trim());
    const userinfo = outputLines.find((line: string) => line.startsWith(queryString));

    if (!userinfo) {
        return null;
    }

    return userinfo.substring(queryString.length).trim();
}