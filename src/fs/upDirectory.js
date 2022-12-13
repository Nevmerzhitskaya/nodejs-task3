import path from 'path';

export default async function upDirecory(filepath) {
    let pathArray = filepath.split(path.sep);
    
    if (pathArray.length > 1) pathArray.pop();

    return pathArray.length > 1 ? pathArray.join(path.sep) : pathArray + path.sep;
};