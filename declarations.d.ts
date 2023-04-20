// declaration.d.ts
declare module "*.scss" {
	const content: Record<string, string>;
	export default content;
}

declare module "*.png";

declare module "*.jpg";

declare function importScripts(...urls: string[]): void;