import { createWriteStream } from 'node:fs';
import { createReadStream } from 'node:fs';
import { unlink } from 'node:fs/promises';
import path from 'path';
import ErrorsMessage from '../helpers/errorsMessage.js';
import errorConsole from '../helpers/errorsOutput.js';

export default async function move(pathSource, pathCopyDirectory) {

    const pathCopy = path.join(pathCopyDirectory, path.basename(pathSource));
    const readStream = createReadStream(pathSource);


    const writeStream = createWriteStream(pathCopy);

    readStream.on('error', async function (err) {
        writeStream.end();
        await unlink(pathCopy, (err) => errorConsole(ErrorsMessage.OPERATION_FAILED, err.message));
        errorConsole(ErrorsMessage.OPERATION_FAILED, err.message);
    }).on('end', async function () {
        await unlink(pathSource, (err) => errorConsole(ErrorsMessage.OPERATION_FAILED, err.message));
        console.log(`\u001b[32m File ${pathSource} was successfully moved to ${pathCopyDirectory} \u001B[0m`);
    }).pipe(writeStream).on('error', (err) => errorConsole(ErrorsMessage.OPERATION_FAILED, err.message));
}