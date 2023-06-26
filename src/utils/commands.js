
import list from '../fs/list.js';
import upDirecory from '../fs/upDirectory.js';
import cd from '../fs/cd.js';
import read from '../fs/read.js';
import create from '../fs/create.js';
import path from 'path';
import rename from '../fs/rename.js';
import copy from '../fs/copy.js';
import move from '../fs/move.js';
import remove from '../fs/delete.js';
import osInfo from '../os/osInfo.js';
import calculateHash from '../hash/calcHash.js';
import compress from '../zip/compress.js';
import decompress from '../zip/decompress.js';
import ErrorsMessage from '../helpers/errorsMessage.js';
import { pathMessage } from '../helpers/helpers.js';



export const operation = async (string, currentPath) => {

  const regex = /^([^ ]+)(\s+(([^ "]+)|"([^"]+)"))?(\s+(([^ "]+)|"([^"]+)"))?/;
  const tempArray = string.trim().match(regex);
  const absolutePath = (tempArray && tempArray[4]) ? path.isAbsolute(tempArray[4]) : null;
  const absolutePath2 = (tempArray && tempArray[8]) ? path.isAbsolute(tempArray[8]) : null;
  const errorMessage = ErrorsMessage.INVALID_INPUT + 'Please enter correct path\n';

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
        console.log(errorMessage);
      }
      break;
    case 'cat':
      if (tempArray && tempArray[4]) {
        tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
        await read(tempPath);
      } else {
        console.log(errorMessage);
      }
      break;
    case 'add':
      if (tempArray && tempArray[4] && !absolutePath) {
        await create(path.join(currentPath, tempArray[4]));
      } else {
        console.log(errorMessage);
      }
      break;
    case 'rn':
      if (tempArray && tempArray[4] && tempArray[8]) {
        tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
        await rename(tempPath, path.join(currentPath, tempArray[8]));
      } else {
        console.log(errorMessage);
      }
      break;
    case 'cp':
      if (tempArray && tempArray[4] && tempArray[8]) {
        tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
        const tempPathNew = absolutePath2 ? tempArray[8] : path.join(currentPath, tempArray[8]);
        await copy(tempPath, tempPathNew);
      } else {
        console.log(errorMessage);
      }
      break;
    case 'mv':
      if (tempArray && tempArray[4] && tempArray[8]) {
        tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
        const tempPathNew = absolutePath2 ? tempArray[8] : path.join(currentPath, tempArray[8]);
        await move(tempPath, tempPathNew);
      } else {
        console.log(errorMessage);
      }
      break;
    case 'rm':
      if (tempArray && tempArray[4]) {
        tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
        await remove(tempPath);
      } else {
        console.log(errorMessage);
      }
      break;
    case 'os':
      if (tempArray && tempArray[4] && tempArray[4].startsWith('--')) {
        await osInfo(tempArray[4].substring(2));
      } else {
        console.log(errorMessage);
      }
      break;
    case 'hash':
      if (tempArray && tempArray[4]) {
        tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
        await calculateHash(tempPath);
      } else {
        console.log(errorMessage);
      }
      break;
    case 'compress':
      if (tempArray && tempArray[4] && tempArray[8]) {
        tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
        const tempPathNew = absolutePath2 ? tempArray[8] : path.join(currentPath, tempArray[8]);
        console.log('tempPathNew', tempPathNew);
        await compress(tempPath, tempPathNew);
      } else {
        console.log(errorMessage);
      }
      break;
    case 'decompress':
      if (tempArray && tempArray[4] && tempArray[8]) {
        tempPath = absolutePath ? tempArray[4] : path.join(currentPath, tempArray[4]);
        const tempPathNew = absolutePath2 ? tempArray[8] : path.join(currentPath, tempArray[8]);
        await decompress(tempPath, tempPathNew);
      } else {
        console.log(errorMessage);
      }
      break;
    default:
      console.log(`\u001B ${ErrorsMessage.INVALID_INPUT} \u001B[0m`);
  }

  pathMessage(currentPath);

  return currentPath;
}

export default operation;