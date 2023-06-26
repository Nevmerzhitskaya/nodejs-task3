import { rename as renameFile } from 'node:fs/promises';
import ErrorsMessage from '../helpers/errorsMessage.js';
import errorConsole from '../helpers/errorsOutput.js';

export default async function rename(oldFile, newFile) {
    try {
        await renameFile(oldFile, newFile);
        console.log(`\u001b[32m File ${oldFile} was successfully renamed to ${newFile} \u001B[0m`);
    } catch (err) {
        errorConsole(ErrorsMessage.OPERATION_FAILED, err.message);
    }
}