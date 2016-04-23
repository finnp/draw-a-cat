## Color it

Now you've already drawn a black rectangle. Awesome! If you look at it from
very far away, it actually looks like a black cat.

Let's try a different cat color. How about `'rgb(236,203,170)'`?

You don't know that color? It [looks like this](http://www.color-hex.com/color/eccbaa).
The values between the brackets represent the colors red, green and blue. 0 means
none of this color and 255 means a lot of this color. So `'rgb(255, 0, 0)'` would be
red.

To draw a rectangle in a different color we have to set the `fillStyle` attribute
to another value and then call the rect function. This would draw a red square:

```js
ctx.fillStyle = 'rgb(255,0,0)'
ctx.fillRect(50,50,100,100)
```

## JavaScript: Strings

JavaScript doesn't know colors by default. That's why the colors are actually
represented as text. Text in JavaScript always needs to be surrounded by `''`
characters or alternatively with `""`. This is needed to know that you actually
meant text and not variables or numbers.

These texts are called Strings in JavaScript. Here are a few examples:
```js
'hello I am a String'
"I am a String as well"
'10'
"Without the quotation marks that value above would be a Number"
```

## Instructions

Draw a rectangle with the color `'rgb(236,203,170)'`.
