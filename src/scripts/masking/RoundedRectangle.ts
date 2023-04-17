import { Graphics } from 'pixi.js';

export class RoundedRectangle extends Graphics{
    
    private readonly radius: number;
    private readonly original: number[];

    constructor(width:number, height:number, radius: number) {
        super();
              
        this.radius = radius || 20;

        this.beginFill(0xFF0000)
            .drawRoundedRect(0, 0, 100, 100, this.radius)

        this.geometry.updateBatches();

        this.original = this.geometry.points.slice()
        
        this.resize(width, height);
    }

    public resize(width:number, height:number) {
      
        // cap it..
        const radius = this.radius;
        
       
        this._transformID = -1;
        const points = this.geometry.points;
        const originalPoints =  this.original;
        const middleWidth = width - (radius*2);
        const middleHeight = height - (radius*2);
        


        for(let i = 0; i < points.length /2; i++)
        {
            const px = originalPoints[(i*2)];
            const py = originalPoints[(i*2)+1];

            if(px <= radius)
            {
                points[(i*2)] = px;
            }
            else if(px > 100-radius)
            {
                points[(i*2)] = (px-(100-radius)) + middleWidth;
            }
            else
            {
                points[(i*2)] = middleWidth;
            }

            if(py <= radius)
            {
                points[(i*2)+1] = py;
            }
            else if(py >= 100-radius)
            {
                points[(i*2)+1] = (py-(100-radius)) + middleHeight;
            }
            else
            {
                points[(i*2)+1] = radius + middleHeight;
            }
        }
    }
}