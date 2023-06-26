import process from 'node:process';
import { homedir } from 'os';
import operation from './utils/commands.js';
import { pathMessage } from './helpers/helpers.js';


const argv = process.argv.find((arg) => arg.startsWith('--username'));
const userParam = argv ? argv.split('=') : [];
const username = userParam && userParam[1] ? userParam[1] : 'anonymous';
let currentPath = homedir();


console.log(`Welcome to the File Manager, ${username}!`);

pathMessage(currentPath);

process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

process.on('SIGINT', () => {
    process.exit(0);
});

const echoInput = async (chunk) => {

    const chunkStringified = chunk.toString();
    if (chunkStringified.includes('.exit')) process.exit(0);


    currentPath = await operation(chunkStringified.replace('\r\n', ''), currentPath);

};

await process.stdin.on("data", echoInput);