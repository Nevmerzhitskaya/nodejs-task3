import process from 'node:process';
import { homedir } from 'os'
import list from './fs/list.js';
import upDirecory from './fs/upDirectory.js';


const argv = process.argv;
const username = argv.find((arg) => arg.startsWith('--username')).split('=')[1];
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
    const name = string.trim().split(' ')[0];

    switch (name) {
        case 'up':
            currentPath = await upDirecory(currentPath);
            break;
        case 'ls':
            await list(currentPath);
            break;
        case 'cd':
            await list(currentPath);
            break;
        default:
            console.log('Invalid input');
    }
}