'use server'

import * as crypto from 'crypto';
const NodeRSA = require('node-rsa')
import getEnvData from '../getEnvData'

// Runs as a Next.js Server Action: the function body — including the
// getEnvData() lookup that resolves the tenant's AES key / RSA keypair —
// executes only on the server. The browser bundle only ever sees an RPC
// stub, never the key material or getEnvData's contents.
export async function clientEncrypt(dpdKey: string, method: string, value: any, context: string) {
    try {
        const deploymentData: any = await getEnvData(dpdKey, method)
        let encryptCredentials: any
        for (let i = 0; i < deploymentData.encryptionInfo.items.length; i++) {
          if (deploymentData.encryptionInfo.items[i].type === method) {
            encryptCredentials = deploymentData.encryptionInfo.items[i]
          }
        }

        if (encryptCredentials) {
          if (method == 'AESCTR') {
            const key =  Uint8Array.from(Buffer.from(encryptCredentials.Key, 'base64'));
            const iv = Uint8Array.from(Buffer.from(encryptCredentials.IVlength, 'base64'));
            const cipher = crypto.createCipheriv(encryptCredentials.mode,key,iv);
            let ciphertext = cipher.update(JSON.stringify(value), 'utf8', 'base64');

            return ciphertext += cipher.final('base64');
          }else if(method == 'AESGCM'){
            const key =  Uint8Array.from(Buffer.from(encryptCredentials.Key, 'base64'));
            const iv = Uint8Array.from(Buffer.from(encryptCredentials.IVlength, 'base64'));

            const cipher = crypto.createCipheriv(encryptCredentials.mode, key, iv);
            let ciphertext = cipher.update(JSON.stringify(value), 'utf8', 'base64');
            ciphertext += cipher.final('base64');

            const authTag = cipher.getAuthTag().toString('base64');

            return {ciphertext,authTag};
          }else if (method == 'RSA') {
          try {
            const publicKey = encryptCredentials.publicKey
            const encryptData = async (data: string) => {
              const key = new NodeRSA(publicKey)
              return key.encrypt(data, 'base64')
            }

            const sensitiveData = value
            const encryptedData = await encryptData(
              JSON.stringify(sensitiveData)
            )
            return encryptedData
            } catch (error) {
            console.error('RSA encryption error:', error)
            }
          } else{
            throw 'Invalied Encryption Method'
          }
        }
      } catch (error: any) {
        console.error('Encryption error:', error);
        return { error: 'Encryption failed' ,status: 500 };
      }
}
