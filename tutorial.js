/*
@author Kiwi
@date 2021-09-28

Exploring drag and drop with code from
	https://editor.p5js.org/enickles/sketches/H1n19TObz

version comments
    vertex constructor
    create 100 vertices and draw them with .show()
    mousePressed, mouseReleased, contains
    create offset vector whenever mouse clicks the vertex in pressed()
    retrieve x in show() to update our vertex's position while dragging
    mouseMoved, hovering flag

🐞: vertices don't highlight on mouseover when dragging
 */

let font
let vertices
let n // number of vertices we want


function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}


function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    vertices = []
    n = 100

    for (let i=0; i<n; i++) {
        vertices.push(new Vertex(random(width), random(height),
            random(15, 25)))
    }
}


function draw() {
    background(209, 80, 30)

    // let's draw all of our vertices!
    vertices.forEach(v => v.show(mouseX, mouseY))
}


// if we press our mouse, check all Vertices on the canvas with our current
// (mouseX, mouseY) to see if they've been pressed
function mousePressed() {
    vertices.forEach(v => v.pressed(mouseX, mouseY))
}


// call all our Vertices and make sure they know nothing's clicking them
function mouseReleased() {
    vertices.forEach(v => v.notPressed(mouseX, mouseY))
}


function mouseMoved() {
    /*
      we can check if we're mousing over any vertex here
      on mouseMoved(), check contains foreach r in vertices
        if contains:
            set hover to true
        else set hover to false

      in show(), fill transparent if hover is true
     */
    vertices.forEach(v => {
        v.hovering = !!v.contains(mouseX, mouseY)
    })

}

/*
 This circle handles drag and drop. Whenever the mouse clicks within our
  area, an offset vector is created. It points from the center of our vertex
  to our mouseX, mouseY point.

  When dragging, we use this offset to calculate how the vertex's show
   method displays it.
 */
class Vertex {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r

        // offsets help us calculate where to display our vertex while
        // we're dragging it, since our mouse coordinates constantly update.
        // we want the difference vector between the center of our circle and
        // and the point where our mouse clicked to start dragging
        this.offsetX = 0
        this.offsetY = 0
        this.dragging = false
        this.hovering = false
    }

    // (x, y) refers to (mouseX, mouseY), the coordinates of the mouse
    // that's doing the dragging; this method will be called with
    // show(mouseX, mouseY)
    show(x, y) {
        stroke(0, 0, 100)
        fill(0, 0, 100, 20)

        if (this.dragging) {
            this.x = x - this.offsetX
            this.y = y - this.offsetY
        }

        if (this.hovering)
            fill(0, 0, 100, 50)

        circle(this.x, this.y, this.r*2)
    }

    // this is called on every Vertex on the canvas. we want to check if the
    // mouse is within our vertex, and if so, update our offsets. the offset
    // is the vector from the origin to the point where the mouse clicked.
    pressed(x, y) {
        // hey! did the mouse click on me?
        if (this.contains(x, y)) {
            this.dragging = true
            this.offsetX = x - this.x
            this.offsetY = y - this.y

        }
    }

    // this should be called for every Vertex on the canvas whenever the
    // mouseReleased() event fires. we set our dragging flag to false :)
    notPressed(x, y) {
        this.dragging = false
    }

    // a simple "does our Vertex area contain the point where the mouse
    // clicked" boolean function
    contains(x, y) {
        let distance = dist(this.x, this.y, x, y)
        return distance <= this.r
    }
}