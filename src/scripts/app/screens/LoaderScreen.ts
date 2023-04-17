import type { Loader } from '@play-co/astro';
import { Bar } from '@play-co/astro';
import { gsap } from 'gsap';
import { Container } from 'pixi.js';

export class LoaderScreen implements Loader {
    public view: Container;
    public bar: Bar;

    constructor() {
        this.view = new Container();

        this.bar = new Bar({ bg: 0x000000, bar: 0xffffff, width: 100 });
        this.view.addChild(this.bar);
        this.bar.scale.y = 0.1;
    }

    public updateProgress(value: number): void {
        this.bar.ratio = value;
    }

    public show(): void {
        this.view.alpha = 0;

        gsap.to(this.view, { duration: 0.4, alpha: 1 });
    }

    public hide(): Promise<void> {
        return new Promise((resolve) => {
            // begin transition in...
            gsap.to(this.view, {
                duration: 0.4,
                alpha: 0,
                onComplete: resolve,
            });
        });
    }

    public resize(w: number, h: number): void {
        this.bar.x = w / 2 - this.bar.width / 2;
        this.bar.y = h / 2;
    }
}
