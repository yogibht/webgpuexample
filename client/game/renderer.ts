import { toRadian, toDegree } from "@utilities/general";
import { Color } from "@utilities/helpers";

interface IRPColorAttachment{
	view?: GPUTextureView | null;
	clearValue: number[];
	loadOp: string;
	storeOp: string;
}

interface IRenderPassDescriptor {
	label: string;
	colorAttachments: IRPColorAttachment[];
}

class Renderer {

	private renderContext: GPUCanvasContext ;
	private device: GPUDevice;
	private presentationFormat: GPUTextureFormat;

	private renderPipeline: GPURenderPipeline;
	private renderPassDescriptor: GPURenderPassDescriptor | IRenderPassDescriptor;

	constructor(renderContext: GPUCanvasContext, device: GPUDevice, presentationFormat: GPUTextureFormat){
		this.renderContext = renderContext;
		this.device = device;
		this.presentationFormat = presentationFormat;
	}

	public init(): void{
		const module = this.device.createShaderModule({
			label: "triangle shaders",
			code: `
				@vertex fn vs(
					@builtin(vertex_index) vertexIndex : u32
				) -> @builtin(position) vec4f {
					var pos = array<vec2f, 3>(
						vec2f( 0.0,  0.5),  // top center
						vec2f(-0.5, -0.5),  // bottom left
						vec2f( 0.5, -0.5)   // bottom right
					);

					return vec4f(pos[vertexIndex], 0.0, 1.0);
				}

				@fragment fn fs() -> @location(0) vec4f {
					return vec4f(1.0, 0.0, 0.0, 1.0);
				}
			`
		});

		this.renderPipeline = this.device.createRenderPipeline({
			label: "triangle pipeline",
			layout: "auto",
			vertex: {
				module,
				entryPoint: "vs"
			},
			fragment: {
				module,
				entryPoint: "fs",
				targets: [{ format: this.presentationFormat }]
			}
		});

		this.renderPassDescriptor = {
			label: "basic renderpass",
			colorAttachments: [
				{
					view: null,
					clearValue: [0.3, 0.3, 0.3, 1],
					loadOp: "clear",
					storeOp: "store"
				}
			]
		};
	}

	public render(): void{
		((this.renderPassDescriptor as IRenderPassDescriptor).colorAttachments[0] as IRPColorAttachment).view = this.renderContext.getCurrentTexture().createView();

		const encoder = this.device.createCommandEncoder({ label: "our encoder" });

		const pass = encoder.beginRenderPass(this.renderPassDescriptor as GPURenderPassDescriptor);
		pass.setPipeline(this.renderPipeline);
		pass.draw(3);
		pass.end();

		const commandBuffer = encoder.finish();
		this.device.queue.submit([commandBuffer]);
	}

}

export {
	Renderer
};