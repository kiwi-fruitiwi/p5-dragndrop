/*
@author Kiwi
@date 2021-09-20

Exploring drag and drop with code from
	https://editor.p5js.org/enickles/sketches/H1n19TObz
 */
let font
let rectangles

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    rectangles = []

    for (let i=0; i < 10; i++) {
        rectangles.push(new Rectangle(random(width),
            random(height),
            random(50, 100),
            random(50, 100)))
    }
}

function draw() {
    background(209, 80, 30)
    rectangles.forEach(r => r.show(mouseX, mouseY))
}


function mousePressed() {
    rectangles.forEach(r => r.pressed(mouseX, mouseY))
}

function mouseReleased() {
    rectangles.forEach(r => r.notPressed())
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.offsetX = 0
        this.offsetY = 0
        this.dragging = false
    }

    show(px, py) {
        if (this.dragging) {
            this.x = px + this.offsetX
            this.y = py + this.offsetY
        }

        stroke(0, 0, 100) // white
        noFill()
        rect(this.x, this.y, this.w, this.h)
    }

    pressed(px, py) {
        if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
            this.dragging = true
            this.offsetX = this.x - px
            this.offsetY = this.y - py
        }
    }

    notPressed(px, py) {
        this.dragging = false
    }
}