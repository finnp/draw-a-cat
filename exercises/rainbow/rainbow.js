var rainbowColors = [
	'rgb(255,0,0)',
  'rgb(255, 145, 0)',
  'rgb(248, 255, 0)',
  'rgb(0,255,0)',
  'rgb(0, 145, 255)',
  'rgb(125, 0, 255)'
]
 
rainbowColors.forEach(function(color, index) {
	ctx.fillStyle = color
	ctx.fillRect(0,  50, 2000, 50)
})