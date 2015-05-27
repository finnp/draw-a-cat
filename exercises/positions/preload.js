var x = 50
var y = 100

ctx.fillStyle = 'rgb(195, 179, 156)'
// body
ctx.fillRect(x + 40, 0, 200, 90)
// feet
ctx.fillRect(x + 40, 90, 30, 40)
ctx.fillRect(x + 210, 90, 30, 40)

ctx.fillStyle = 'rgb(172, 128, 86)'
//head
ctx.fillRect(x + 210, -30, 80, 80)
// tail
ctx.fillRect(x, 0, 40, 20)