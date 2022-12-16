import { createWriteStream } from 'node:fs';
import { createReadStream } from 'node:fs';
import * as fsPromises from 'node:fs/promises';

export default async function copy(pathSource, pathCopy) {

    const readStream = createReadStream(pathSource);
    const writeStream = createWriteStream(pathCopy);

    readStream.on('error', async function (err) {
        writeStream.end();
        fsPromises.unlink(pathCopy, function (err) {
            if (err) console.error(`FS operation failed. ERROR REMOVE FILE ${pathCopy}`);
        });
        console.error(`FS operation failed. Cannot find file ${pathSource}`);
    }).pipe(writeStream).on('error', () => console.log(`FS operation failed.`));
}