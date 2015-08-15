## Position Improved

Positioning your cat with calculations is handy. However there
is another way to do this, where you don't need to do all those
calculations by yourself. (Why didn't I tell you this earlier, right?)

The solution is a function called `translate` that is part of the drawing
context. By calling it you can set the anchor of your coordination system
to another position. So if you set your anchor to `(10,10)` by calling
`ctx.translate(10,10)` everthing you draw after that point will be shifted by
`(10,10)`. So drawing a rectangle like this `ctx.fillRect(0, 0, 2, 2)` will
actually draw the rectangle at the position `(10,10)`.

This means
```js
ctx.translate(10, 10)
ctx.fillRect(0, 0, 2, 2)
```
would draw the rectangle at the same position as
```js
ctx.translate(0, 0)
ctx.fillRect(10, 10, 2, 2)
```
## Instructions

Set the anchor of this canvas to the `x` and `y` position specified in the code
to make sure it will be in the right position.
