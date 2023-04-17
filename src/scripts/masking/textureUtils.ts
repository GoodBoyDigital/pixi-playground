import { ImageSource, Rectangle, Texture } from 'blaze';

async function loadImage(url:string):Promise<ImageBitmap>
{
    
        const img = document.createElement('img');

        img.crossOrigin = 'anonymous';

        img.src = url;
        await img.decode();

        const imageBitmap = await createImageBitmap(img, {
          //  premultiplyAlpha: 'premultiply',
        });

        return imageBitmap;
}

export async function loadTexture(url:string):Promise<Texture>
{
    
        const imageBitmap = await loadImage(url);

       return new Texture({
            source: new ImageSource({
                resource:imageBitmap,
                scaleMode:'linear',
            }),
            layout:{
                frame:new Rectangle(0,0,1,1),
            },
            style:{
                scaleMode:'linear',
            }
        })
  
}