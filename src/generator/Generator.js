import crypto from 'crypto';

export default class Generator {
    generateKey() {
        return  crypto.randomBytes(32).toString("hex");
    }

    generateInt(min, max) {
        return crypto.randomInt(min, max + 1);
    }

    generateHMAC(message, key) {
        return crypto.createHmac("sha3-256", key).update(String(message)).digest("hex");
    }
};