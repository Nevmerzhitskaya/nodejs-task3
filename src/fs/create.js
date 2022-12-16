import * as fsPromises from 'node:fs/promises';

const error = new Error('FS operation failed');

export default async function create(filePath) {
    try {
        const buff = await fsPromises.open(filePath);
        
        if(buff) {
            console.error(error.name + ':', error.message);
            throw error;
        }

    } catch (err) {
        if(err.code === 'ENOENT') await fsPromises.writeFile(filePath);
    }
}