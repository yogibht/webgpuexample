import { Renderer } from "./renderer";
import { findFPS } from "@utilities/general";
import { Vector } from "@utilities/helpers";

interface ISMProps {
	render?: IRenderProps;
	debug?: IDebugProps;
}

interface IDebugProps {
	fpsDisplayContainer?: HTMLElement;
}

interface IRenderProps {
	fps?: number;
	fpsInterval?: number;
	fpsTolerance?: number;
	threaded?: boolean;
}

class SceneManager {

	private canvas: HTMLCanvasElement;
	private renderContext: CanvasRenderingContext2D;

	private renderer: Renderer;

	private props: ISMProps;

	/*********************************************/
	// Looping related attribs and methods
	// This will probably move to a separate class. For now it's here
	private then: number = 0;
	private loopId: number = 0;
	/*********************************************/

	constructor(canvas: HTMLCanvasElement, smProps?: ISMProps){
		this.props = this.setupDefaultProps(smProps);

		this.canvas = canvas;
			this.renderContext = this.canvas.getContext("2d") as CanvasRenderingContext2D;
		this.renderer = new Renderer(this.renderContext);
	}

	private setupDefaultProps(props?: ISMProps): ISMProps{
		if(!props) props = {};

		return props;
	}

	private async setDefaultRenderProps(): Promise<void>{
		try{
			const systemFPS = await findFPS();

			if(!this.props.render) this.props.render = {};
			if(!this.props.render.fps || this.props.render.fps>systemFPS) this.props.render.fps = systemFPS;
			this.props.render.fpsTolerance = 0.1;
			this.props.render.fpsInterval = (1000 / (this.props.render.fps ?? 0)) - this.props.render.fpsTolerance;
			
			this.then = performance.now();
		}
		catch(err){
			console.error(err);
		}
	}

	public async init(): Promise<void | string>{
		try{
			await this.setDefaultRenderProps();

			this.loop(performance.now());

			this.setupInputEvents();
		}
		catch(err){
			console.error(err);
		}
	}

	private loop(now: number): void{
		this.loopId = requestAnimationFrame(this.loop.bind(this));

		const delta = now - this.then;

		if(delta < (this.props.render?.fpsInterval as number)) return;

		if(this.props.debug?.fpsDisplayContainer) this.props.debug.fpsDisplayContainer.innerHTML = `${Math.round(1000 / delta)} fps`;

		this.render();

		this.then = now;
	}

	private render(): void{

		this.renderer.render();
		
	}

	private setupInputEvents(): void{
		document.addEventListener("keyup", (ev)=>{
			if(ev.key==="w"){
				// TODO switch renderer
			}
		});
	}

}

export {
	SceneManager
};