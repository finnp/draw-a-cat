## Rectangle

Let's start drawing something simple. How about a nice black rectangle?

If we want to draw, we have to use our 2d drawing context. The context is kind
like the brush we use to draw on our canvas.

In this exercises we call it `ctx`, but that's just a name we chose. This `ctx`
is actually a variable as well, just that it doesn't have a number assigned to it
like in the last exercise, but the drawing context instead.

If we want to draw a rectangle with the context we can use it like this:
```
ctx.fillRect(x, y, width, height)
```

But we have to specify the value for `x`, `y`, `width` and `height`. For example
if would like to draw a square in the top-left corner, me might do
```
ctx.fillRect(0, 0, 100, 100)
```

## JavaScript: Function calling

`fillRect`is what is called a function in JavaScript. They are way cooler than most 
functions you might know from Maths, because they can take multiple values and do
fun stuff with them. In this case the `fillRect` function can draw a rectangle.

The round brackets `()` are for telling the function to do something and also
to tell it what values it should use for the action. We call this function calling.

## Instructions

Draw a rectangle at the position (50,50), with a width of 200 and a height of 100.