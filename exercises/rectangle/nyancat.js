var catHeight = 150
var catX = 200
var catY = 70

ctx.fillStyle = '#002E68'
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
 
// rainbow

var rainbowColors = [
	'#FF0000',
  '#FF9100',
  '#F8FF00',
  '#00FF00',
  '#0091FF',
  '#7D00FF'
]
 
rainbowColors.forEach(function(color, index) {
	ctx.fillStyle = color
	ctx.fillRect(0, catY + index * catHeight / 6, catX + 20, catHeight / 6)
})

// cat


ctx.translate(catX, catY)

// tail


ctx.fillStyle = '#999999'
ctx.lineWidth = 12

ctx.save()
ctx.scale(4, 1)
drawCircle(-8,  catHeight - 40, 9)

ctx.restore()

ctx.stroke()
ctx.fill()
 
// feet


drawCircle(40, 208 - 150 + catHeight - 50, 13)
ctx.stroke()
ctx.fill()
drawCircle(09, 208 - 150 + catHeight - 50, 13)
ctx.stroke()
ctx.fill()
drawCircle(160, 205 - 150 + catHeight - 50, 13)
ctx.stroke()
ctx.fill()
drawCircle(120, 207 - 150 + catHeight - 50, 13)
ctx.stroke()
ctx.fill()
 
ctx.fillStyle = '#FFC993'
ctx.strokeStyle = "black"
drawRect(0, 50 - 50, 190, catHeight, 20)
ctx.stroke()
ctx.fill()

ctx.fillStyle = '#FF7DFD'
drawRect(10, 60 - 50, 170, catHeight - 20 , 30)
ctx.fill()


// dots
ctx.fillStyle = '#FF00A0'
drawCircle(100, 50, 8)
ctx.fill()
drawCircle(80, 110, 8)
ctx.fill()
drawCircle(24, 70, 8)
ctx.fill()
drawCircle(74, 80, 8)
ctx.fill()
drawCircle(40, 40, 8)
ctx.fill()
drawCircle(100, 80, 8)
ctx.fill()
drawCircle(30, 120, 8)
ctx.fill()
drawCircle(140, 27, 8)
ctx.fill()
drawCircle(165, 44, 8)
ctx.fill()
drawCircle(20, 97, 8)
ctx.fill()
drawCircle(110, 125, 8)
ctx.fill()



// head 


ctx.scale(1.5, 1)

var headY = -8
var headOffsetX = -50

ctx.fillStyle = '#999999'
ctx.beginPath()
ctx.arc(170 +  headOffsetX, headY + 10 + catHeight - 50, 45, -0.3, Math.PI + 0.3)
ctx.lineTo(130 + headOffsetX, headY + 115 - 150 + catHeight - 50)
ctx.lineTo(155 + headOffsetX, headY + 133 - 150 + catHeight - 50)
ctx.lineTo(185+ headOffsetX, headY + 133 - 150 + catHeight - 50)
ctx.lineTo(208+ headOffsetX, headY + 114 - 150 + catHeight - 50)
ctx.lineTo(213+ headOffsetX, headY + 149 - 150 + catHeight - 50)
ctx.stroke()
ctx.fill()
 
ctx.fillStyle = '#FF8B93'
drawCircle( - 70 + 210 + headOffsetX, headY + 175 - 150 + catHeight - 50, 10)
ctx.fill()
drawCircle( - 70 + 270 + headOffsetX, headY + 175 - 150 + catHeight - 50, 10)
ctx.fill()
 
// eyes
ctx.fillStyle = 'black'
drawCircle( - 70 + 260 + headOffsetX, headY + 158 - 150 + catHeight - 50, 7)
ctx.fill()
drawCircle( - 70 + 220 + headOffsetX, headY +158 - 150 + catHeight - 50, 7)
ctx.fill()

// mouth
ctx.lineWidth = 5
ctx.beginPath()
ctx.arc(  + 5 + 155 + headOffsetX, headY + 184 - 150 + catHeight - 50, 10, 2*Math.PI, 3 * Math.PI)
ctx.stroke()
ctx.beginPath()
ctx.arc(  + 5 + 175 + headOffsetX, headY + 184 - 150 + catHeight - 50, 10, 2*Math.PI, 3 * Math.PI)
ctx.stroke()



 
function drawCircle(x, y, r) {
	ctx.beginPath()
	ctx.arc(x, y, r, 0, 2*Math.PI)
}

function drawRect(x,y,width,height,r) {
	ctx.beginPath()
  ctx.moveTo(x+r,y)
  ctx.lineTo(x+width-r,y)
  ctx.arc(x+width-r,y+r, r, 1.5 * Math.PI, 2*Math.PI)
  ctx.lineTo(x+width,y+height-r)
  ctx.arc(x+width-r,y+height-r, r, 2 * Math.PI, 2.5 * Math.PI)
  ctx.lineTo(x+r,y+height)
  ctx.arc(x+r,y+height-r, r, 2.5 * Math.PI, 3 * Math.PI)
  ctx.lineTo(x,y+r)
  ctx.arc(x+r,y+r, r, 3 * Math.PI, 3.5 * Math.PI)
}