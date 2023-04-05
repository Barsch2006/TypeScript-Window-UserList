export default class User {
    username: string;
    domain: boolean;
    name: string | null;
    class: string | null;
    ready: boolean | null;
    constructor(username: string, domain: boolean);
    parseData(): Promise<void>;
}
