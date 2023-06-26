import { createBrotliCompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';
import ErrorsMessage from '../helpers/errorsMessage.js';
import errorConsole from '../helpers/errorsOutput.js';

const brotli = createBrotliCompress();

export default async function compress(pathSource, pathDestination) {
    const source = createReadStream(pathSource);
    const fileName = path.basename(pathSource);
    const fileCompress = path.join(pathDestination, fileName + '.br');
    console.log('fileName', fileName);
    console.log('fileCompress', fileCompress);
    console.log('pathDestination', pathDestination);
    const destination = createWriteStream(fileCompress);

    source.on('error', (err) => errorConsole(ErrorsMessage.OPERATION_FAILED, err.message))
        .pipe(brotli).on('error', (err) => errorConsole(ErrorsMessage.OPERATION_FAILED, err.message))
        .pipe(destination).on('error', (err) => errorConsole(ErrorsMessage.OPERATION_FAILED, err.message))
        .on('finish', () => {
            console.log(`\u001b[32m File ${pathSource} is commpressed to ${pathDestination} \u001B[0m`);
        });
}