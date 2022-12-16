import { createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';

const brotli = createBrotliDecompress();
const error = new Error('FS operation failed');

export default async function decompress(pathSource, pathDestination) {
    const source = createReadStream(pathSource);
    const fileDecompress = path.join(pathDestination, path.parse(pathSource).name);
    const destination = createWriteStream(fileDecompress);

    source.on('error', () => {
        console.error(error.name + ':', error.message + ` Cannot find file ${pathSource}`);
    }).pipe(brotli).on('error', () => {
        console.error(error.name + ':', error.message);
    }).pipe(destination).on('error', () => {
        console.error(error.name + ':', error.message);
    }).on('finish', () => {
        console.log(`File ${pathSource} is decommpressed`);
    });;
}