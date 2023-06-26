import * as os from 'node:os';
import ErrorsMessage from '../helpers/errorsMessage.js';

export default async function osInfo(command) {
    switch (command) {
        case 'EOL':
            console.log('EOL (default system End-Of-Line): \u001b[33m', JSON.stringify(os.EOL), '\u001B[0m');
            break;
        case 'cpus':
            console.log(os.cpus());
            break;
        case 'homedir':
            console.log('Home directory: \u001b[33m', os.homedir(), '\u001B[0m');
            break;
        case 'username':
            console.log('System user name: \u001b[33m', os.userInfo().username, '\u001B[0m');
            break;
        case 'architecture':
            console.log('\u001b[33m', os.arch(), '\u001B[0m');
            break;
        default:
            console.log('\u001b[31m', ErrorsMessage.INVALID_INPUT, '\u001B[0m');
    }
}