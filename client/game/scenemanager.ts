/// <reference types="@webgpu/types" />

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
	// private renderContext: GPUCanvasContext;

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

	private async setupRenderContext(): Promise<void>{
		const adapter = await window.navigator?.gpu?.requestAdapter() as GPUAdapter;
		const device: GPUDevice = await adapter?.requestDevice();
		if(!device){
			throw new Error("Could not find WebGPU. Please enabled WebGPU!!!");
		}
		else{
			const presentationFormat = window.navigator?.gpu.getPreferredCanvasFormat();
			const renderContext = this.canvas.getContext("webgpu") as GPUCanvasContext;
			renderContext?.configure({
				device,
				format: presentationFormat
			});
			this.renderer = new Renderer(renderContext, device, presentationFormat);
		}
	}

	public async init(): Promise<void | string>{
		try{
			await this.setDefaultRenderProps();

			await this.setupRenderContext();
			this.renderer.init();

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