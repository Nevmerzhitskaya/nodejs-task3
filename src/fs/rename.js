import * as fsPromises from 'node:fs/promises';

export default async function rename(oldFile, newFile) {

    const error = new Error('FS operation failed');

    try {

        const isExistSourceFile = await checkFile(oldFile);
        if(!isExistSourceFile) throw error;

        const isExistResultFile = await checkFile(newFile);
        if(isExistResultFile) throw error;

        await fsPromises.rename(oldFile, newFile);

    } catch (err) {
        console.error(error.name + ':', error.message);
    }
}

async function checkFile(path) {
    try {
        await fsPromises.open(path, 'r');

        return true;
    } catch (err) {
        return false;
    }
}