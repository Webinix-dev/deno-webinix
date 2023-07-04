/**
 * # Webinix
 *
 * > Use any web browser as GUI, with Deno in the backend and HTML5 in the
 * > frontend, all in a lightweight Deno module.
 *
 * ## Features
 *
 * - Fully Independent (_No need for any third-party runtimes_)
 * - Lightweight _~900 Kb_ for the whole package & Small memory footprint
 * - Fast binary communication protocol between Webinix and the browser (_Instead of JSON_)
 * - Multi-platform & Multi-Browser
 * - Using private profile for safety
 * - Original library written in Pure C
 *
 * ## Installation
 * `import { webinix } from "https://deno.land/x/webinix/mod.ts";`
 *
 * ## Minimal Example
 *
 * ```ts
 * import { webinix } from "https://deno.land/x/webinix/mod.ts";
 *
 * const myWindow = webinix.newWindow();
 * webinix.show(myWindow, "<html>Hello World</html>");
 * webinix.wait();
 * ```
 *
 * @module
 * @license MIT
 */
export * as webinix from "./src/webinix.ts";
