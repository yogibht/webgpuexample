import parentStyles from "./index.scss";

import { LitElement, html, unsafeCSS } from "lit";
import type { CSSResult, TemplateResult } from "lit";

import "@gui/guimanager";

class App extends LitElement {

	constructor(){
		super();
	}

	public static get styles(): CSSResult{
		return unsafeCSS(parentStyles.toString());
	}

	public connectedCallback(): void{
		super.connectedCallback();

		console.log("app initiated");
	}

	public render(): TemplateResult{

		return html`
			<div>
				<gui-manager></gui-manager>
			</div>
		`;
	}
}

export { App };

customElements.define("main-app", App);


/** Need this for PWA. There must be a better place to put this and run it? Lots of optimization needed**/
/*
window.addEventListener("load", function(){
	registerSW();
});

async function registerSW(){
	if ("serviceWorker" in navigator) {
		try {
			await navigator.serviceWorker.register("/mainserviceworker.js");
			console.log("ServiceWorker registration successful");
		} catch (e) {
			console.log("ServiceWorker registration failed. Sorry about that.", e);
		}
	} else {
		console.log("Your browser does not support ServiceWorker.");
	}
}
*/
/****** */