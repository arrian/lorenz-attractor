const sigma = 10.0;
const rho = 28.0;
const beta = 8.0/3.0;

const SCALE = 5;
const COLOUR_SCALE = 0.1;
const WIDTH = 800;
const HEIGHT = 600;
const DT = 0.01;

let lorenz;

function setup() {
	createCanvas(WIDTH, HEIGHT, WEBGL);
	angleMode(DEGREES);
	colorMode(HSB);
	strokeWeight(10);

	lorenz = new Lorenz();
}

function draw() {
	background(0);

	lorenz.update(DT);
	lorenz.draw();
}


class Lorenz {

	constructor() {
		this.position = createVector(0.01,0.01,0.01);
		this.points = [];
	}

	update(dt) {
		let dx = (sigma * (this.position.y - this.position.x)) * dt;
    let dy = (this.position.x * (rho - this.position.z) - this.position.y) * dt;
    let dz = (this.position.x * this.position.y - beta * this.position.z) * dt;

		this.position = this.position.copy().add(dx, dy, dz);
		this.points.push(this.position);
	}

	draw() {
		push();

		if(mouseIsPressed) {
			rotateY(mouseX * 0.01);
			rotateX(mouseY * -0.01);
		}

		beginShape();
		this.points.forEach((p, index) => {
			fill(index * COLOUR_SCALE % 255, 255, 255);
			vertex(p.x * SCALE, p.y * SCALE, p.z * SCALE);
		});
		endShape();

		pop();
	}
}
