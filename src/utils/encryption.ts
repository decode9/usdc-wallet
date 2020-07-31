import * as crypto from "crypto";
const algorithm = 'aes-192-cbc';

export const encrypt = async (string: string) => {
    return new Promise((resolve, reject) => {

        let password = crypto.randomBytes(20).toString('hex');
        let salt = crypto.randomBytes(20).toString('hex');

        const hmac = crypto.createHmac('sha256', password);
        hmac.update(salt);

        const key = hmac.digest('hex');

        const cipher = crypto.createCipher(algorithm, key);

        let encrypted = '';

        cipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = cipher.read())) {
                encrypted += chunk.toString('hex');
            }
        })

        let lastPass = '';

        cipher.on('end', () => {
            lastPass = salt + encrypted + password;
            resolve(lastPass);
        });

        cipher.write(string);

        cipher.end();
    })
}


export const decrypt = async (string: string) => {
    return new Promise((resolve, reject) => {
        let encrypted = string.slice(40, 72);

        let password = string.slice(-40);
        let salt = string.slice(0, 40);

        const hmac = crypto.createHmac('sha256', password);
        hmac.update(salt);

        const key = hmac.digest('hex');

        const decipher = crypto.createDecipher(algorithm, key);

        let decrypted = '';

        decipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = decipher.read())) {
                decrypted += chunk.toString('utf8');
            }
        })

        decipher.on('end', () => {
            resolve(decrypted);
        });

        decipher.write(encrypted, 'hex');

        decipher.end();
    })
}