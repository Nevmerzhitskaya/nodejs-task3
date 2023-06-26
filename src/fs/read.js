import * as fsPromises from 'node:fs/promises';
import ErrorsMessage from '../helpers/errorsMessage.js';
import errorConsole from '../helpers/errorsOutput.js';

export default async function read(filepath) {
    try {
        console.log('filepath', filepath);
        const contents = await fsPromises.readFile(filepath, { encoding: 'utf8' });
        console.log(contents);

    } catch (err) {
        errorConsole(ErrorsMessage.OPERATION_FAILED, err.message);
    }
}