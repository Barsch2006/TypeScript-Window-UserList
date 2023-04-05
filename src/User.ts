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
        const userData: string = await runCmd("net", `user ${this.username}${this.domain ? " /domain" : ""}`);
        const name: string | null = await BenutzerName(userData);
        const userClass: string | null = await BenutzerKlasse(userData);

        this.name = name;
        this.class = userClass;
        this.ready = true;
    }
}

async function BenutzerKlasse(output: string) {
    const queryString: string = process.env.CLASS_QUERY ?? "Globale Gruppenmitgliedschaften";
    const outputLines: string[] = output.split("\n").map((line: any) => line.trim());
    const userinfo: string | undefined = outputLines.find((line: any) => line.startsWith(queryString));

    if (!userinfo || userinfo.substring(queryString.length).trim() == process.env.RETURN_NULL_CLASS) {
        return null;
    }

    return userinfo.substring(queryString.length).trim();
}

async function BenutzerName(output: string) {
    const queryString: string = process.env.NAME_QUERY ?? "Vollst�ndiger Name";
    const outputLines: string[] = output.split("\n").map((line: string) => line.trim());
    const userinfo = outputLines.find((line: string) => line.startsWith(queryString));

    if (!userinfo) {
        return null;
    }

    return userinfo.substring(queryString.length).trim();
}