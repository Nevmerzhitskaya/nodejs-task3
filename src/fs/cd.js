import * as fsPromises from 'node:fs/promises';

export default async function cd(filepath) {
    try {
        await fsPromises.access(filepath);
        
        return filepath;
        
    } catch (err) {
        console.error(err.name + ':', 'Operation failed');
    }
}
