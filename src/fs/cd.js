import * as fsPromises from 'node:fs/promises';
import ErrorsMessage from '../helpers/errorsMessage.js';
import errorConsole from '../helpers/errorsOutput.js';

export default async function cd(filepath) {
    try {
        await fsPromises.access(filepath);

        return filepath;

    } catch (err) {
        errorConsole(ErrorsMessage.OPERATION_FAILED, err.message);
    }
}
