import { createBrotliCompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';

const brotli = createBrotliCompress();
const error = new Error('FS operation failed');

export default async function compress(pathSource, pathDestination) {
    const source = createReadStream(pathSource);
    const fileName = path.basename(pathSource);
    const fileCompress = path.join(pathDestination, fileName + '.br');
    console.log('fileName', fileName);
    console.log('fileCompress', fileCompress);
    console.log('pathDestination',pathDestination);
    const destination = createWriteStream(fileCompress);

    source.on('error', () => {
        console.error(error.name + ':', error.message + ` Cannot find file ${pathSource}`);
    }).pipe(brotli).on('error', () => {
        console.error(error.name + ':', error.message);
    }).pipe(destination).on('error', () => {
        console.error(error.name + ':', error.message);
    }).on('finish', () => {
        console.log(`File ${pathSource} is commpressed`);
    });
}