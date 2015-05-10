## Rectangle

Let's start drawing something simple. How about a nice black rectangle?

If we want to draw, we have to use our 2d drawing context. The context is kind
like the brush we use to draw on our canvas.

In this exercises we call it `ctx`, but that's just a name we chose.

If we want to draw a rectangle with the context we can use:
```
ctx.fillRect(x, y, width, height)
```

But we have to specify the value for `x`, `y`, `width` and `height`. For example
if would like to draw a square in the top-left corner, me might do
```
ctx.fillRect(0, 0, 100, 100)
```

## Instructions

Draw a rectangle at the position (50,50), with a width of 200 and a height of 100.