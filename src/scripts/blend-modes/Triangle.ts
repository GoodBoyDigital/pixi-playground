/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { Texture } from 'blaze';
import type {Sprite } from 'blaze';
import {Mesh,MeshGeometry} from 'blaze';
import type { Rectangle } from 'blaze/lib/maths';


const triangleGeometry = new MeshGeometry({
    positions: new Float32Array([-100, -100, 100, -100, 100, 100]),
    uvs: new Float32Array([0, 0, 1, 0, 1, 1]),
    indices: new Uint32Array([0, 1, 2]), // triangle 1);
});

export class Triangle
{
    view:Sprite;

    gravity = 0.75// * 0.2;
    tick = Math.random() * 200;
    
	speedX = Math.random() * 10;
    speedY = (Math.random() * 10) - 5;

    positionX = 0;
    positionY = 0;

    bounds:Rectangle;

    constructor(texture:Texture, bounds:Rectangle)
    {
        this.view = new Mesh(triangleGeometry, texture)
     //   this.view.renderable._anchor.set(0.5, 0.5);
      //  this.view.transform.scale.set(4)
        this.bounds = bounds
        this.view.transform.rotation = Math.random() * Math.PI * 2;
        this.view.transform.position.x = Math.random() * bounds.width
        this.view.transform.position.y = Math.random() * bounds.height
    }

    public update()
    {
      
     this.tick ++
     // /   this.view.transform.alpha = (1 + Math.sin(  this.tick * 0.1 )) * 0.5 // + Math.random() * 0.5;
      //  this.view.transform.rotation += 0.01;
        // this.view.transform.position.y = this.positionY = pY
    }
}
