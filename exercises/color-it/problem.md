## Color it

Now you've already drawn a black rectangle. Awesome! If you look at it from
very far away, it actually looks like a black cat.

Let's try a different cat color. How about `#eccbaa`?

You don't know that color? It [looks like this](http://www.color-hex.com/color/eccbaa).
A common way to refer to colors on the web is to use their hex code. That is just 
a number of the color in hexadecial representation. 
You can use a [color picker](http://www.hexcolortool.com/)  to get the hexcode of a color you want. 
Try to use some of your favorite colors.

To draw a rectangle in a different color we have to set the `fillStyle` attribute
to another value and then call the rect function. This would draw a red square:

```js
ctx.fillStyle = '#ff0000'
ctx.fillRect(50,50,100,100)
```

## Instructions

Draw a rectangle with the color `#eccbaa`.