import { unlink } from 'node:fs/promises';
import ErrorsMessage from '../helpers/errorsMessage.js';
import errorConsole from '../helpers/errorsOutput.js';

export default async function remove(filePath) {
    try {

        await unlink(filePath);

        console.log(`\u001b[32m File ${filePath} was successfully deleted \u001B[0m`);
    } catch (err) {
        errorConsole(ErrorsMessage.OPERATION_FAILED, err.message);
    }
};