const canvas = document.
	querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
var promptDialougeHeight = canvas.height / 30
var choiceBoxSize = (canvas.height / 2) - promptDialougeHeight
var choiceButtonWidth = canvas.width/2
let bread_sprite = document.getElementById("toast");
let toaster_sprite = document.getElementById("toaster");
class Player {
	constructor(x,y,radius,color){
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
	}
	draw(){
		c.beginPath()
		c.arc(this.x, this.y, 
			this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
	}
}
function isInside(pos, rect) {
  return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}

var yesBoxRect = {
	x: 0,
	y: canvas.height - choiceBoxSize + promptDialougeHeight,
	width: choiceButtonWidth,
	height: choiceBoxSize - promptDialougeHeight
}
var noBoxRect = {
	x: choiceButtonWidth,
	y: canvas.height - choiceBoxSize + promptDialougeHeight,
	width: choiceButtonWidth,
	height: choiceBoxSize - promptDialougeHeight
}
var toastBoxRect = {
	x: canvas.width /2 - (canvas.width / 5 / 2) ,
	y: (canvas.height / 2) - choiceBoxSize - (promptDialougeHeight )  + ( (canvas.width / 5 ) /2 / 2	 ),
	width: canvas.width / 5,
	height: canvas.width / 5
}
var toasterBoxRect = {
	x: canvas.width - canvas.width / 4,
	y: (canvas.height / 2) - choiceBoxSize - (promptDialougeHeight )  + (canvas.width / 5 ) / 2 / 2,
	width: canvas.width / 4,
	height: canvas.width / 5
}
function refreshVariables()
{
	 //canvas.width = innerWidth
	 //canvas.height = innerWidth
	 promptDialougeHeight = canvas.height / 30
	 choiceBoxSize = (canvas.height / 2) - promptDialougeHeight
	 choiceButtonWidth = canvas.width/2
	 noBoxRect = {
		x: choiceButtonWidth,
		y: canvas.height - choiceBoxSize + promptDialougeHeight,
		width: choiceButtonWidth,
		height: choiceBoxSize - promptDialougeHeight
	 }
	 yesBoxRect = {
		x: 0,
		y: canvas.height - choiceBoxSize + promptDialougeHeight,
		width: choiceButtonWidth,
		height: choiceBoxSize - promptDialougeHeight
	 }
}
function draw(heading, txt) {
	if (canvas.width != innerWidth || canvas.height != innerHeight)
	{
		console.log("refreshing")
		refreshVariables()
	}
	c.clearRect(0,0,canvas.width,canvas.height)
	c.fillStyle = '#fcad74'
	c.fillRect(0,0,canvas.width,canvas.height)
	// question
	c.fillStyle = '#000000'
	c.fillRect(0,  canvas.height - choiceBoxSize - promptDialougeHeight,canvas.width,choiceBoxSize)
	c.fillStyle = '#ffffff'
	fontSize = Math.round(promptDialougeHeight,0)
	c.font = fontSize + "px Arial";
	c.textAlign = "center";
	c.fillText(heading || "Do you cook bread", canvas.width/2, canvas.height - (choiceBoxSize  - (fontSize/2)))// + (fontSize /2));
	c.drawImage(bread_sprite, toastBoxRect.x , toastBoxRect.y, toastBoxRect.width, toastBoxRect.height);
	c.drawImage(toaster_sprite, toasterBoxRect.x , toasterBoxRect.y, toasterBoxRect.width, toasterBoxRect.height);
	if (txt != null)
	{
		c.fillStyle = '#fc7474'
		c.fillRect(0,  canvas.height - choiceBoxSize + promptDialougeHeight,canvas.width,yesBoxRect.height)
		c.fillStyle = '#ffffff'
		c.font = fontSize + "px Arial";
		c.textAlign = "left"
		c.fillText(txt, 10, canvas.height - yesBoxRect.height + promptDialougeHeight + (fontSize/2))
		return;
	}
	// yes box
	c.fillStyle = '#fcc153'
	c.fillRect(yesBoxRect.x, yesBoxRect.y, yesBoxRect.width, yesBoxRect.height)
	// no box
	c.fillStyle = '#fc9753'
	c.fillRect(noBoxRect.x, noBoxRect.y, noBoxRect.width, noBoxRect.height)
	
	c.fillStyle = '#ffffff'
	// draw yes / no
	fontSize = Math.round(yesBoxRect.width * 0.3,0)
	c.font = fontSize + "px Arial";
	const y = canvas.height - (( choiceBoxSize + promptDialougeHeight) / 2) + (fontSize/2)
	c.fillText('YES', canvas.width/2/2, y)
	c.fillText('NO', canvas.width /2 + canvas.width /2/2 , y )
}
var textStage = 0
const consequences = {
	yes: {
		heading: "Murderer",
		dialouge: [
			"You put the toast delicately into the toaster, tossing it into the figurative flames of hell.",
			"It's screams are inaudible against your ignorant humming, as you reach for the butter and turn the dial to max.",
			"Flames engulf the toast. His family of 11 watching in horror.",
			"In a hopeless act of revenge he leaps out and onto your expensive yet highly flammable carpet",
			"In his dying breath he frees his family out onto the lawn by nudging them off the windowcill.",
			"I forgot to mention this but you are on the 100th floor of an apartment building",
			"As you turn around, butter and butter knife in hand, you notice the flickering glow, and the burntout corpse of your victim.",
			"Now it's your turn to be served up."
		]
	},
	no: {
		heading: "Befriender of the toast.",
		dialouge: [
			"You pause and stare at the loaf of bread.",
			"You ponder whether pointless violence is the answer to your insatiable hunger",
			"It's probably best to let the bread live happily you decide.",
			"Soon after this thought the bread leaps around you. Praising your godliness",
			"Congratulations, you are a good person. (I hope)",
		]
	},
	secret: {
		heading: "Clicker of toast",
		dialouge: [
			"You press the toast.",
			"Your finger seems to be a little shorter when you unpoke",
			"That's not tomatoe juice!",
		]
	},
	toaster: {
		heading: "Why?",
		dialouge: [
			"You stare at the toaster",
			"Quite an interesting toaster really",
			"It has a mix of vintage and modern design",
			"Compact and functional.",
			"I'm not sure why you would waste your choice looking at a toaster though."
		]
	}
}
currentConsequence = null
function animate() {
	animationId = requestAnimationFrame(animate)
	if (currentConsequence == null)
	{
		draw()
		return;
	}
	if (textStage >= currentConsequence.dialouge.length)
	{
		draw("Retry?", "You have no say, accept your fate.")
		return;
	}
	draw(currentConsequence.heading, currentConsequence.dialouge[textStage])
}
window.addEventListener('click', (evt)=> {
	 if (currentConsequence == null)
	 {
		 mousePos = {
			 x: event.clientX,
			 y: event.clientY
		 }
		 if (isInside(mousePos, yesBoxRect))
		 {
			 console.log("yes")
			 currentConsequence = consequences.yes
		 }
		 else if (isInside(mousePos, noBoxRect))
		 {
			 console.log("no")
			 currentConsequence = consequences.no
		 }
		 else if (isInside(mousePos, toastBoxRect))
		 {
			 console.log("toast")
			 currentConsequence = consequences.secret
		 }
		 else if (isInside(mousePos, toasterBoxRect))
		 {
			 	 console.log("toaster")
			 currentConsequence = consequences.toaster
		 }
	 }
	 else
	 {
		 textStage = textStage + 1
		 if (textStage > currentConsequence.dialouge.length)
		 {
			 currentConsequence = null
			 textStage = 0
		 }
	 }
})

animate()