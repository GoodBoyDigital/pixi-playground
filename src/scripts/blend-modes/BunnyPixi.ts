/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import type { Rectangle, Texture } from 'pixi.js';
import { Sprite } from 'pixi.js';


export class BunnyPixi
{
    view:Sprite;

    gravity = 0.75// * 0.2;

	speedX = Math.random() * 10;
    speedY = (Math.random() * 10) - 5;

    positionX = 0;
    positionY = 0;

    bounds:Rectangle;

    constructor(texture:Texture, bounds:Rectangle)
    {
        this.view = new Sprite(texture)

      //  this.view.transform.scale.set(2)
        this.bounds = bounds
    }

    public update()
    {
        let pX = this.positionX;
        let pY = this.positionY;

        pX += this.speedX;
        pY += this.speedY;
        this.speedY += this.gravity;

        if (pX > this.bounds.right)
        {
            this.speedX *= -1;
            pX = this.bounds.right;
        }
        else if (pX < this.bounds.left)
        {
            this.speedX *= -1;
            pX = this.bounds.left;
        }

        if (pY > this.bounds.bottom)
        {
            this.speedY *= -0.85;
            pY = this.bounds.bottom;
            if (Math.random() > 0.5)
            {
                this.speedY -= Math.random() * 6;
            }
        }
        else if (pY < this.bounds.top)
        {
            this.speedY = 0;
            pY = this.bounds.top;
        }

        this.view.transform.position.x = this.positionX = pX
        this.view.transform.position.y = this.positionY = pY
    }
}
