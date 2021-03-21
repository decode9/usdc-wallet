import * as crypto from "crypto";
const algorithm = 'aes-192-cbc';

export const encrypt = async (string: string) => {
    return new Promise((resolve, reject) => {

        const password = crypto.randomBytes(20).toString('hex');
        const salt = crypto.randomBytes(20).toString('hex');

        const key = crypto.scryptSync(password, salt, 24);

        const iv = crypto.randomBytes(16);

        const StringIV = iv.toString('hex');

        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = '';
        let lastPass = '';

        cipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = cipher.read())) {
                encrypted += chunk.toString('hex');
                lastPass = salt + encrypted + StringIV + password;
                resolve(lastPass);
            }
        })

        cipher.write(string);

        cipher.end();
    })
}


export const decrypt = async (string: string) => {
    return new Promise((resolve, reject) => {

        const encrypted = string.slice(40, 136);
        const iv = Buffer.from(string.slice(136, 168), 'hex');
        const password = string.slice(-40);
        const salt = string.slice(0, 40);

        const key = crypto.scryptSync(password, salt, 24);

        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        let decrypted = '';

        decipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = decipher.read())) {
                decrypted += chunk.toString('utf8');
                resolve(decrypted);
            }
        })

        decipher.write(encrypted, 'hex');

        decipher.end();
    })
}