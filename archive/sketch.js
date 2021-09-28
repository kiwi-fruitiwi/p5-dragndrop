/*
@author Kiwi
@date 2021-09-20

Exploring drag and drop with code from
	https://editor.p5js.org/enickles/sketches/H1n19TObz

🐞: rectangles don't highlight on mouseover when dragging

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

function mouseMoved() {
    /*
      we can check if we're mousing over any rectangle here
      on mouseMoved(), check contains foreach r in rectangles
        if contains:
            set hover to true
        else set hover to false

      in show(), fill transparent if hover is true
     */

    rectangles.forEach(r => {
        if (r.contains(mouseX, mouseY))
            r.hovering = true
        else r.hovering = false
    })
}

/**
 This rectangle handles drag and drop. Whenever the mouse clicks within the
 rectangle's bounding box, an offset vector is created. It points from
 the rectangle's top left point (rectMode(CORNER)) to our mouseX,
 mouseY point.

 When dragging, we use this offset to calculate how the rectangle's show
 method displays it.
 */
class Rectangle {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        // offsets help us calculate where to display our rectangle while
        // we're dragging it, since our mouse coordinates constantly update.
        // We want the difference vector between the top left point of our
        // rectangle and the point where our mouse clicked to start dragging
        this.offsetX = 0
        this.offsetY = 0
        this.dragging = false
        this.hovering = false
    }

    // px and py refer to pointer_x and pointer_y, the coordinates of the
    // mouse dragging
    show(mx, my) {
        if (this.dragging) {
            this.x = mx - this.offsetX
            this.y = my - this.offsetY
        }

        if (this.hovering) {
            fill(0, 0, 100, 20)
        } else {
            noFill()
        }

        stroke(0, 0, 100) // white
        rect(this.x, this.y, this.w, this.h, 3)
    }

    pressed(mx, my) {
        // this is a contains check. Is the mouse at (mx, my) within the
        // boundary of our rectangle?
        if (this.contains(mx, my)) {
            this.dragging = true
            this.offsetX = mx - this.x
            this.offsetY = my - this.y
        }
    }

    notPressed(mx, my) {
        this.dragging = false
    }

    // returns true if our rectangle contains a point (x,y), non-inclusive
    contains(x, y) {
        return (x > this.x &&
            x < this.x + this.w &&
            y > this.y &&
            y < this.y + this.h)
    }
}