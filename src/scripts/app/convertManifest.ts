import type { Manifest } from '@play-co/astro';
import type { ResolverManifest } from 'pixi.js';

import { getResolutionOfUrl } from '../../../../pixijs/node_modules/@pixi/utils';

export function convertManifest(manifest: Manifest): ResolverManifest 
{

    const resolverManifest: ResolverManifest = {};

    resolverManifest.bundles = Object.keys(manifest)
    .map((key: any) => {
        const oldBundle = manifest[key];
        
        const bundle: any = {
            name:key
        };

        // deal with images...
        bundle.assets = Object.keys(oldBundle.image).map((key)=>{
             
            let shortcut = null;
            let isSpriteSheet = false;

            const assets:string[] = [];
        
                Object.keys(oldBundle.image[key]).forEach((subKey)=>{
                    if(subKey !== 'shortcut')
                    {
                        if(subKey === 'tags')
                        {
                            isSpriteSheet = true;

                            return;
                        }

                       Object.values(oldBundle.image[key][subKey]).forEach((imageType)=>{

                        if(typeof imageType === 'string')
                        {
                            if(isSpriteSheet)
                            {
                                if(imageType.includes('.webp'))
                                {
                                    assets.push(imageType);
                                }
                                else
                                {
//                                    const resolution = 
                                    assets.push({
                                        format:'png',
                                        resolution:getResolutionOfUrl(imageType),
                                        src:imageType,
                                    })
                                
                                }

                                // // console.log(imageType)
                                // assets.push({
                                //     resolution:2,
                                //     format: 'png',
                                //  //   spriteSheet:true,
                                //     src:imageType
                                // });
                            }
                            else
                            {
                                assets.push(imageType);
                            }
                        }

                        });
                    }
                    else
                    {
                        shortcut = oldBundle.image[key][subKey];
                    }
                })
        
            let name = key;

            if(shortcut)
            {
                name = [key, shortcut];
            }

            return {
                name,
                srcs:assets,
            }
        });

        return bundle;
    })

    console.log(resolverManifest)

    return resolverManifest;
    
}
