## Rainbow

Now that we know how to color rectangles, we can go an create a rainbow!

Below we already specified a list of colors. Lists in JavaScript look like this:
```js
var list = [
  'some text',
  'more text',
  'numbers work as well',
  42
]
```
They start and end with `[ ]` brackets and the values are separated by commas.
In JavaScript we also call this lists Arrays, but that's just a fancy programmer
word for lists.

The `rainbowColors.forEach` means that we want to loop through all items of the
`rainbowColors` list. For each color we are drawing a rectangle at `(0,50)`. But
we only see the last color right now, because all the rectangles are drawn at the
same position.

How can we make it a real nice rainbow?

```
rainbowColors.forEach(function(color, index) {
	ctx.fillStyle = color
	ctx.fillRect(0, 50, 2000, 50)
})
```


## Instructions

