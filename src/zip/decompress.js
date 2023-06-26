import { createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';
import ErrorsMessage from '../helpers/errorsMessage.js';
import errorConsole from '../helpers/errorsOutput.js';

const brotli = createBrotliDecompress();

export default async function decompress(pathSource, pathDestination) {
    const source = createReadStream(pathSource);
    const fileDecompress = path.join(pathDestination, path.parse(pathSource).name);
    const destination = createWriteStream(fileDecompress);

    source.on('error', (err) => errorConsole(ErrorsMessage.OPERATION_FAILED, err.message))
        .pipe(brotli).on('error', (err) => errorConsole(ErrorsMessage.OPERATION_FAILED, err.message))
        .pipe(destination).on('error', (err) => errorConsole(ErrorsMessage.OPERATION_FAILED, err.message))
        .on('finish', () => {

            console.log(`\u001b[32m File ${pathSource} is decommpressed to ${pathDestination}\u001B[0m`);
        });
}