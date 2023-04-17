/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { Sprite,Texture  } from 'blaze';
import {Graphics,Mesh, MeshGeometry } from 'blaze';
import type { Rectangle } from 'blaze/lib/maths';

const size = 150;

const quadGeometry = new MeshGeometry({
    positions: new Float32Array([-size, -size, size, -size, size, size, -size, size]),
    uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
    indices: new Uint32Array([0, 1, 2, 0, 2, 3]), // triangle 1);
});


export class BunnyMesh
{
    view:Mesh;

    gravity = 0.75// * 0.2;

    tick = 0;
	speedX = Math.random() * 10;
    speedY = (Math.random() * 10) - 5;

    positionX = 0;
    positionY = 0;

    bounds:Rectangle;

    constructor(texture:Texture, bounds:Rectangle)
    {
        this.view = new Mesh(quadGeometry, texture)
   
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

        this.view.position.x = this.positionX = pX
        this.view.position.y = this.positionY = pY

        const size = (100 + (60 * Math.sin(this.tick * 0.1)))// * 0.1;

        this.tick++;

        const pos = new Float32Array([-size, -size, size, -size, size, size, -size, size]);


        for(let i = 0; i < pos.length; i++)
        {
            this.view.renderable.geometry.positions[i] = pos[i]
            
        }

      //  this.view.renderable.geometry.attributes.aPosition.buffer.update();
    }
}
