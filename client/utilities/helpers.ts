class Vector {
	public x: number = Infinity;
	public y: number = Infinity;

	constructor(x: number, y: number){
		if(!isNaN(x)) this.x = x;
		if(!isNaN(y)) this.y = y;
	}

	public get distance(): number {
		return Math.hypot(this.x, this.y);
	}

	public get unit(): Vector {
		const magnitude = this.distance;
		return new Vector(
			this.x / magnitude,
			this.y / magnitude
		);
	}

	public get clone(): Vector {
		return new Vector(this.x, this.y);
	}

	public add(vec: Vector): void {
		this.x += vec.x;
		this.y += vec.y;
	}

	public subtract(vec: Vector): void {
		this.x -= vec.x;
		this.y -= vec.y;
	}

	public multiply(scalar: number): void {
		this.x *= scalar;
		this.y *= scalar;
	}

	public static distance(vec: Vector): number {
		return Math.hypot(vec.x, vec.y);
	}

	public static normalize(vec: Vector): Vector {
		const magnitude = Math.hypot(vec.x, vec.y);
		return new Vector(
			vec.x / magnitude,
			vec.y / magnitude
		);
	}

	public static add(vec1: Vector, vec2: Vector): Vector {
		return new Vector(
			vec1.x + vec2.x,
			vec1.y + vec2.y
		);
	}

	public static subtract(vec1: Vector, vec2: Vector): Vector {
		return new Vector(
			vec1.x - vec2.x,
			vec1.y - vec2.y
		);
	}

	public static multiply(vec: Vector, scalar: number): Vector {
		return new Vector(
			vec.x * scalar,
			vec.y * scalar
		);
	}

	public static getRelativeVetor(angle: number, length: number = 1, offsetX: number = 0, offsetY: number = 0): Vector {
		return new Vector(
			length * Math.sin(angle) + offsetX,
			length * Math.cos(angle) + offsetY
		);
	}
}


class Color {

	public r: number = 1.0;
	public g: number = 1.0;
	public b: number = 1.0;
	public a: number = 1.0;

	constructor(r: number, g: number, b: number, a?: number) {
		if(!isNaN(r)) this.r = r;
		if(!isNaN(g)) this.g = g;
		if(!isNaN(b)) this.b = b;
		if(!isNaN(a as number)) this.a = a as number;
	}

	public get clone(): Color {
		return new Color(this.r, this.g, this.b, this.a);
	}
}

export {
	Vector,
	Color
};