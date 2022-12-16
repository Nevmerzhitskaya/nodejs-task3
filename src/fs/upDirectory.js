import path from 'path';

export default async function upDirecory(filepath) {
    return path.resolve(filepath, '..');
}