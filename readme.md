# draw-a-cat
[![NPM](https://nodei.co/npm/draw-a-cat.png)](https://nodei.co/npm/draw-a-cat/)

Beginners workshopper for the canvas API.

Work in progress.


## Ideas

### Terminal version

- Normal workshopper
- Explanation enough that you don't need visuals
- `draw-a-cat run number1.js` open browser and render
- `draw-a-cat verify number1.js` use mock canvas for verification, open browser with differ

### Browser version

Verification
- Compare image pixel by pixel
  - Pro: Different ways to arrive at the same outcome
  - Contra: If it's only off by a pixel, it will fail
- Test for context method calls