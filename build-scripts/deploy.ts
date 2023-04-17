

const { exec } = require('child_process');

import { generateSlug } from 'random-word-slugs';

const version = `pixi-v8-${generateSlug(2)}`;

console.log('building')
exec('npm run prod:local', (err, stdout, stderr) => {

    console.log('build complete')
    upload()
})

function upload()
{
    console.log(`uploading to ${version}.surge.sh` );
    
    exec(`surge --domain  ${version}.surge.sh ./dist`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);

            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);

            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}