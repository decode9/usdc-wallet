import * as crypto from "crypto";
import { encrypt, decrypt } from "./encryption";


export const encryptPassword = async (password: string) => {

    const privat = crypto.randomBytes(20).toString('hex');

    let encrypted = '';

    await encrypt(privat).then((result) => {
        encrypted += result;
    })

    const hmac2 = crypto.createHmac('sha256', encrypted + privat);
    hmac2.update(password);
    let encryptedPassword = hmac2.digest('hex');

    return encrypted + encryptedPassword;

}

export const validatePassword = async (password: string, encrypted: string) => {
    let string = encrypted.slice(0, 208);
    let realPassword = encrypted.slice(-64);

    let privat = ''
    await decrypt(string).then((result) => {
        privat += result;
    })

    const hmac2 = crypto.createHmac('sha256', string + privat);
    hmac2.update(password);
    let encryptedPassword = hmac2.digest('hex');

    let validatePassword = realPassword === encryptedPassword;

    return validatePassword;
}