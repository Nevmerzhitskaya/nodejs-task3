import * as fsPromises from 'node:fs/promises';

export default async function read(filepath) {
    const error = new Error('FS operation failed');

    try {
        console.log('filepath',filepath);
        const contents = await fsPromises.readFile(filepath, { encoding: 'utf8' });
        console.log(contents);

    } catch (err) {
        console.error(error.name + ':', error.message);
    }
}