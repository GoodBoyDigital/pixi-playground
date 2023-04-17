
import type { WebGPURenderer } from 'blaze';
import {
Assets,     ColorMatrixFilter,    Container, 
FillGradient,FillPattern, getGlobalBounds,Graphics,Text    } from 'blaze';



export async function textScene(renderer:WebGPURenderer) {

   
    const texture = await Assets.load('https://pixijs.io/examples/examples/assets/bg_rotate.jpg')
   
    await Assets.load([
        'assets/desyrel.xml',
        'assets/fonts/comicmsdf.fnt',
        'assets/fonts/comicsdf.fnt',
        `assets/COMIC-.woff2`,
        `assets/Branda-yolq.woff2`,
    ])
   
    const container = new Container();

    const root = new Container();

    root.addChild(container);
    

    const wrapWidth = 570;

    const style = {
        fill:'yellow',
        fontFamily:'comic sans ms', 
        wordWrap:true,
        wordWrapWidth:wrapWidth,
        fontSize: 50,
        breakWords:false,
        letterSpacing:0,
      //  align:'center'
       // whiteSpace:'pre',
    }


    const textCanvas = new Text({
        text:'Hi im rendering using a Canvas texture',  
        style
    });

    const textDynamicBitmapFont = new Text({
        text:'Hi im rendering using a Canvas texture', 
        // text:'Hi im rendering using a dynamic Bitmap Font',  
        renderMode:'bitmap',
        style:{
            ...style,
            fill:'green',
        }
    });

    const textLoadedBitmapMSDFFont = new Text({
        text:'Hi im rasdasdadasd adadendering using a Canvas texture', 
        // text:'Hi im rendering using MSDF',  
        style:{
            ...style,
            fill:'red',
            fontFamily:'comicmsdf',
        }
    });

    const textLoadedBitmapSDFFont = new Text({
        text:'Hi im rendering using a Canvas texture', 
        // text:'Hi im rendering using SDF', 
        style:{
            ...style,
            fill:'blue',
            fontFamily:'comicsdf',
        }
    });

    const textLoadedBitmapFont = new Text({
        text:'bitmap fonts are supported!\nWoo yay!', 
        style:{
            // ...style,
            fontSize: 70,
            align: 'left',
            // fill:'blue',
            fontFamily:'Desyrel',
        }
    });
   
  
      container.addChild(textLoadedBitmapMSDFFont);
     container.addChild(textLoadedBitmapSDFFont);
//      container.addChild(textDynamicBitmapFont);
//      container.addChild(textCanvas);
//   container.addChild(textLoadedBitmapFont);
     // textDynamicBitmapFont.x = 200
    
   
     textLoadedBitmapMSDFFont.y = 220
     textDynamicBitmapFont.y = 240
     textCanvas.y = 370
     textLoadedBitmapFont.y = 500
     // textLoadedBitmapFont.x = 100
    
     let visible = true;
    
    //  const cm = new ColorMatrixFilter();

    //  cm.greyscale();
     
    //  container.filters = [
    //     cm 
    //  ]
    //  const bounds = getGlobalBounds(textLoadedBitmapFont);

    // const g = new Graphics();

    // root.addChild(g)
    
    // g.context.rect(bounds.x, bounds.y, bounds.width, bounds.height)
    // .fill({color:'red', alpha:0.5})


    renderer.view.element.addEventListener('mousedown', ()=>{
      
        visible = !visible;
        
        textLoadedBitmapMSDFFont.visible = visible;
        textLoadedBitmapSDFFont.visible = visible;
        textDynamicBitmapFont.visible = visible;
        textCanvas.visible = visible;
        textLoadedBitmapFont.visible = visible;
    })

    let tick = 0;

    
    
    const update = () => {
        
        
        
        
        
        

        renderer.render(root);

      

        tick++;
//       textLoadedBitmapMSDFFont.rotation += 0.01
   
        requestAnimationFrame(update);
    }

    update();
}






