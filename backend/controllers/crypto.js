import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

export const encryptAES = (text, secret) => {
  const iv = crypto.randomBytes(16);
  const key = crypto.createHash('sha256').update(secret).digest(); 
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: iv.toString('hex'),
    Data: encrypted
  };
};

export const decryptAES = (encrypted, secret, iv) => {
  const key = crypto.createHash('sha256').update(secret).digest();
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
