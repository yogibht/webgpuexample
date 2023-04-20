import styles from "./guimanager.scss";

import { LitElement, html, unsafeCSS } from "lit";
import type { CSSResult, TemplateResult } from "lit";

import { SceneManager } from "@game/scenemanager";

class GUIManager extends LitElement {

	private canvas: HTMLCanvasElement;
	private sceneManager: SceneManager;

	private fpsDisplayContainer: HTMLElement;

	constructor(){
		super();
	}

	public static get styles(): CSSResult{
		return unsafeCSS(styles.toString());
	}

	public connectedCallback(): void{
		super.connectedCallback();
	}

	public firstUpdated(): void{
		if(!this.canvas) this.initializeSceneManager()
			.then()
			.catch(err=>console.error(err));
	}

	private async initializeSceneManager(): Promise<void>{
		this.canvas = this.shadowRoot?.querySelector("#maincanvas") as HTMLCanvasElement;
		this.fpsDisplayContainer = this.shadowRoot?.querySelector("#fps-display") as HTMLElement;
		this.sceneManager = new SceneManager(this.canvas, {
			debug: {
				fpsDisplayContainer: this.fpsDisplayContainer
			},
			render: {
				threaded: false
			}
		});
		try{
			await this.sceneManager.init();
		}
		catch(err){console.error(err);}
	}

	public render(): TemplateResult {

		return html`
			<div id="fps-display"></div>
            <canvas id="maincanvas" width="854" height="480"></canvas>
			<div id="config-info">
				App
			</div>
        `;
	}
}

export { GUIManager };

customElements.define("gui-manager", GUIManager);