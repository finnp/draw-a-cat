## Cat Family

Hey, I added another friend for our cat. They are called Jona and Incabel. But actually I would
love to have a whole family of cats. However as you see in my code below, drawing
cats is actually quite repetitive. All that changes are colors. The code is not
very readable anymore.

Wouldn't it be cool if there was a function like `drawCat(x,y)`, that would just
draw a cat on a certain position. I am sorry to disappoint you, but there is no
given `ctx.drawCat()` function.

But don't worry. The good news is: We can create one ourself!


## JavaScript: Creating Function

We can specify functions like this:
```js
function drawSquare(x,y, size) {
  ctx.fillRect(x,y, size, size)
}
```
In this example we create a function called `drawSquare`, that will take a position
`x` and `y` and a `size`. We use the values do feed it into our `ctx.fillRect`
function and use the `size` variable for the `width` and the `height` of the
rectangle. Because that's all a square is, a rectangle with the same width and height.

Now that we have specified it, we can use it similar to the `ctx.fillRect` function:
```
drawSquare(20, 30, 100) // draw a sqare at (20,30) width the size 100
```
Isn't that cool?


## Instructions

Create a function `drawCat` and use it to at least draw 4 cats!
