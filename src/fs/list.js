import * as fsPromises from 'node:fs/promises';

export default async function list(filepath) {
    try {
        const listFiles = await fsPromises.readdir(filepath, { withFileTypes: true });

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
        console.error(err.name + ':', 'Operation failed');
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