import { toRadian, toDegree } from "@utilities/general";
import { Color } from "@utilities/helpers";

class Renderer {

	private renderContext: CanvasRenderingContext2D;

	constructor(renderContext: CanvasRenderingContext2D){
		this.renderContext = renderContext;
	}

	public render(): void{
		
	}

}

export {
	Renderer
};