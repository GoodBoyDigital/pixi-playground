import {
    applyDefineVariables,
    applyFacebookURL,
    FidoCompiler,
    parseArguments,
    parseEnvironmentFile,
} from '@play-co/fido-build';

import type { Arguments } from './utils';

async function main() {
    const args = parseArguments<Arguments>();
 

    // we import our config, after our environment variables have been applied
    const { config } = await import('../configs/fido-config');

    config.mode = args.mode || config.mode;

    const compiler = new FidoCompiler(config);

    if (config.mode === 'development') {
        await compiler.watch();
    } else {
        await compiler.run();

    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
