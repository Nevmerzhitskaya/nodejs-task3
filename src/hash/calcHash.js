import { readFile } from 'node:fs/promises';
import ErrorsMessage from '../helpers/errorsMessage.js';
import errorConsole from '../helpers/errorsOutput.js';

const { createHash } = await import('node:crypto');
const hash = createHash('sha256');

export default async function calculateHash(filePath) {

    try {
        const contents = await readFile(filePath, { encoding: 'utf8' });
        const hex = hash.update(contents);

        console.log('\u001b[33m', hex.digest('hex'), '\u001B[0m');
    } catch (err) {
        errorConsole(ErrorsMessage.OPERATION_FAILED, err.message);
    }
}