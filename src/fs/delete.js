import * as fsPromises from 'node:fs/promises';

const error = new Error('FS operation failed');

export default async function remove(filePath) {
    try {

        await fsPromises.unlink(filePath);

    } catch (err) {
        console.error(error.name + ':', error.message);
    }
};