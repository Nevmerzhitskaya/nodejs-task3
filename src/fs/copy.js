import { createWriteStream } from 'node:fs';
import { createReadStream } from 'node:fs';
import { unlink } from 'node:fs/promises';
import path from 'path';
import ErrorsMessage from '../helpers/errorsMessage.js';
import errorConsole from '../helpers/errorsOutput.js';

export default async function copy(pathSource, pathCopy) {

    const pathCopyDirectory = path.join(pathCopy, path.basename(pathSource));
    const readStream = createReadStream(pathSource);
    const writeStream = createWriteStream(pathCopyDirectory);

    readStream.on('error', async function (err) {
        writeStream.end();
        unlink(pathCopyDirectory, function (err) {
            if (err) errorConsole(ErrorsMessage.OPERATION_FAILED, `ERROR REMOVE FILE ${pathCopyDirectory}`);
        });
        errorConsole(ErrorsMessage.OPERATION_FAILED, `Cannot find file ${pathSource}`);
    }).on('end', () => {

        console.log(`\u001b[32m File ${pathSource} was successfully coppied to ${pathCopyDirectory} \u001B[0m`);
    }).pipe(writeStream).on('error', (err) => errorConsole(ErrorsMessage.OPERATION_FAILED, err.message));
}