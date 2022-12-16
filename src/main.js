import process from 'node:process';
import { homedir } from 'os'
import list from './fs/list.js';
import upDirecory from './fs/upDirectory.js';
import cd from './fs/cd.js';
import read from './fs/read.js';
import create from './fs/create.js';
import path from 'path';
import rename from './fs/rename.js';
import copy from './fs/copy.js';
import move from './fs/move.js';
import remove from './fs/delete.js';
import osInfo from './os/osInfo.js';
import calculateHash from './hash/calcHash.js';
import compress from './zip/compress.js';
import decompress from './zip/decompress.js';


const argv = process.argv;
const userParam = argv.find((arg) => arg.startsWith('--username')).split('=');
const username = userParam && userParam[1] ? userParam[1] : 'anonymous';
let currentPath = homedir();

const pathMessage = (dir) => {
    return console.log("You are currently in ", dir);
}

console.log(`Welcome to the File Manager, ${username}!`);

pathMessage(currentPath);

process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

process.on('SIGINT', () => {
    process.exit(0);
});

const echoInput = (chunk) => {

    const chunkStringified = chunk.toString();
    if (chunkStringified.includes('.exit')) process.exit(0);


    operation(chunkStringified.replace('\r\n', '')).finally(() => {

        pathMessage(currentPath);
    });

};

await process.stdin.on("data", echoInput);

async function operation(string) {

    const regex = /^([^ ]+)(\s+(([^ "]+)|"([^"]+)"))?(\s+(([^ "]+)|"([^"]+)"))?/;
    const tempArray = string.trim().match(regex);
    const absolutePath = (tempArray && tempArray[4]) ? path.isAbsolute(tempArray[4]) : null;
    const absolutePath2 = (tempArray && tempArray[8]) ? path.isAbsolute(tempArray[8]) : null;

    let tempPath = '';

    switch (tempArray && tempArray[1]) {
        case 'up':
            currentPath = await upDirecory(currentPath);
            break;
        case 'ls':
            await list(currentPath);
            break;
        case 'cd':
            if (tempArray && tempArray[4]) {
                tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
                tempPath = await cd(tempPath);
                currentPath = tempPath ? tempPath : currentPath;
            } else {
                console.log('Invalid input \nPlease enter correct path\n');
            }
            break;
        case 'cat':
            if (tempArray && tempArray[4]) {
                tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
                await read(tempPath);
            } else {
                console.log('Invalid input \nPlease enter correct path\n');
            }
            break;
        case 'add':
            if (tempArray && tempArray[4] && !absolutePath) {
                await create(path.join(currentPath, tempArray[4]));
            } else {
                console.log('Invalid input \nPlease enter correct path\n');
            }
            break;
        case 'rn':
            if (tempArray && tempArray[4] && tempArray[8]) {
                tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
                await rename(tempPath, path.join(currentPath, tempArray[8]));
            } else {
                console.log('Invalid input \nPlease enter correct path\n');
            }
            break;
        case 'cp':
            if (tempArray && tempArray[4] && tempArray[8]) {
                tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
                const tempPathNew = absolutePath2 ? tempArray[8] : path.join(currentPath, tempArray[8]);
                await copy(tempPath, tempPathNew);
            } else {
                console.log('Invalid input \nPlease enter correct path\n');
            }
            break;
        case 'mv':
            if (tempArray && tempArray[4] && tempArray[8]) {
                tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
                const tempPathNew = absolutePath2 ? tempArray[8] : path.join(currentPath, tempArray[8]);
                await move(tempPath, tempPathNew);
            } else {
                console.log('Invalid input \nPlease enter correct path\n');
            }
            break;
        case 'rm':
            if (tempArray && tempArray[4]) {
                tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
                await remove(tempPath);
            } else {
                console.log('Invalid input \nPlease enter correct path\n');
            }
            break;
        case 'os':
            if (tempArray && tempArray[4] && tempArray[4].startsWith('--')) {
                await osInfo(tempArray[4].substring(2));
            } else {
                console.log('Invalid input \nPlease enter correct path\n');
            }
            break;
        case 'hash':
            if (tempArray && tempArray[4]) {
                tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
                await calculateHash(tempPath);
            } else {
                console.log('Invalid input \nPlease enter correct path\n');
            }
            break;
        case 'compress':
            if (tempArray && tempArray[4] && tempArray[8]) {
                tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
                const tempPathNew = absolutePath2 ? tempArray[8] : path.join(currentPath, tempArray[8]);
                console.log('tempPathNew',tempPathNew);
                await compress(tempPath, tempPathNew);
            } else {
                console.log('Invalid input \nPlease enter correct path\n');
            }
            break;
        case 'decompress':
            if (tempArray && tempArray[4] && tempArray[8]) {
                tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
                const tempPathNew = absolutePath2 ? tempArray[8] : path.join(currentPath, tempArray[8]);
                await decompress(tempPath, tempPathNew);
            } else {
                console.log('Invalid input \nPlease enter correct path\n');
            }
            break;
        default:
            console.log('Invalid input');
    }
}