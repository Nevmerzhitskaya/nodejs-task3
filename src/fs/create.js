import { writeFile } from 'node:fs/promises';
import ErrorsMessage from '../helpers/errorsMessage.js';
import errorConsole from '../helpers/errorsOutput.js';

export default async function create(filePath) {

    try {
        await writeFile(filePath, '', { flag: 'wx', encoding: 'utf8' });
        console.log(`\u001b[32m File ${filePath} was successfully created \u001B[0m`);
    } catch (err) {
        errorConsole(ErrorsMessage.OPERATION_FAILED, err.message);
    }

}