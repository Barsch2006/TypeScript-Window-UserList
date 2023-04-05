import { get } from 'prompt';

export default async function input(name: string): Promise<string> {
    return new Promise((res, rej) => {
        try {
            get([name], (err: any, result: any) => {
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