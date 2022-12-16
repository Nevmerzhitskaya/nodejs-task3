import { createWriteStream } from 'node:fs';
import { createReadStream } from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import path from 'path';

export default async function move(pathSource, pathCopyDirectory) {

    const pathCopy = path.join(pathCopyDirectory, path.basename(pathSource));
    const readStream = createReadStream(pathSource);


    const writeStream = createWriteStream(pathCopy);

    readStream.on('error', async function (err) {
        writeStream.end();
        await fsPromises.unlink(pathCopy, function (err) {
            if (err) console.error(`FS operation failed. Cannot find file ${pathSource}`);
        });
        console.error(`FS operation failed. Cannot find file ${pathSource}`);
    }).on('end', async function () {
        await fsPromises.unlink(pathSource, function (err) {
            if (err) console.error(`FS operation failed. Cannot find file ${pathSource}`);
        });
    }).pipe(writeStream).on('error', () => console.log(`FS operation failed.`));
}