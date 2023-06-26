import { readdir } from 'node:fs/promises';
import ErrorsMessage from '../helpers/errorsMessage.js';
import errorConsole from '../helpers/errorsOutput.js';

export default async function list(filepath) {
    try {
        const listFiles = await readdir(filepath, { withFileTypes: true });

        let fileArray = [];

        for await (const dirent of listFiles) {
            const fileInfo = {};
            fileInfo["Name"] = dirent.name;

            if (dirent.isFile()) fileInfo["Type"] = 'file';
            if (dirent.isDirectory()) fileInfo["Type"] = 'directory';
            if (dirent.isSymbolicLink()) fileInfo["Type"] = 'symbolic link';

            fileArray.push(fileInfo);
        }

        fileArray.sort(sortByFields());

        console.table(fileArray);

    } catch (err) {
        errorConsole(ErrorsMessage.OPERATION_FAILED, err.message);
    }
}

function sortByFields() {
    return (a, b) => {
        if (a["Type"] == 'directory' && b["Type"] == 'directory') {
            return a["Name"] > b["Name"] ? 1 : -1;
        } else if (a["Type"] == 'directory') {
            return -1;
        } else if (b["Type"] == 'directory') {
            return 1;
        } else {
            return a["Name"] > b["Name"] ? 1 : -1;
        }
    }
}