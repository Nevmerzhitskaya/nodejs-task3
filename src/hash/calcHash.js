import { readFile } from 'node:fs/promises';

const { createHash } = await import('node:crypto');
const hash = createHash('sha256');
const error = new Error('FS operation failed');

export default async function calculateHash(filePath) {

    try {
        const contents = await readFile(filePath, { encoding: 'utf8' });
        const hex = hash.update(contents);

        console.log(hex.digest('hex'));
    } catch (err) {
        console.error(error.name + ':', error.message);        
    }
}