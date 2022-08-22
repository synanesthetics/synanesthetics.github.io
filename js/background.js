import * as PIXI from 'pixi.js';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';
import SimplexNoise from 'simplex-noise';
import hsl from 'hsl-to-hex';
import debounce from 'debounce';

// Create PixiJS app
const app = new PIXI.Application({
    // render to orb-canvas
    view: document.querySelector('.orb-canvas'),
    resizeTo: window,
    transparent: true,
});

// return a random number within a range
function random(min, max) {
    return Math.random() * (max - min) + min;
}
  
  // map a number from 1 range to another
  function map(n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

// Orb class
class Orb {
    // Pixi takes hex colors as hexidecimal literals (0x rather than a string with '#')
    constructor(fill = 0x000000) {
      // bounds = the area an orb is "allowed" to move within
      this.bounds = this.setBounds();
      // initialise the orb's { x, y } values to a random point within it's bounds
      this.x = random(this.bounds['x'].min, this.bounds['x'].max);
      this.y = random(this.bounds['y'].min, this.bounds['y'].max);
  
      // how large the orb is vs it's original radius (this will modulate over time)
      this.scale = 1;
  
      // what color is the orb?
      this.fill = fill;
  
      // the original radius of the orb, set relative to window height
      this.radius = random(window.innerHeight / 6, window.innerHeight / 3);
  
      // starting points in "time" for the noise/self similar random values
      this.xOff = random(0, 1000);
      this.yOff = random(0, 1000);
      // how quickly the noise/self similar random values step through time
      this.inc = 0.002;
  
      // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
      this.graphics = new PIXI.Graphics();
      this.graphics.alpha = 0.825;
  
      // 250ms after the last window resize event, recalculate orb positions.
      window.addEventListener(
        'resize',
        debounce(() => {
          this.bounds = this.setBounds();
        }, 250)
      );
    }
  }