/*
  Webinix Library 2.3.0

  http://webinix.me
  https://github.com/webinix-dev/deno-webinix

  Copyright (c) 2020-2023 Hassan Draga.
  Licensed under MIT License.
  All rights reserved.
  Canada.
*/

import { existsSync } from "../deps.ts";
import { loadLib } from "./lib.ts";
import {
  BindCallback,
  JSONValue,
  Usize,
  WebinixEvent,
  WebinixLib,
} from "./types.ts";
import { fromCString, toCString, WebinixError } from "./utils.ts";

//Register loaded lib (and allow mutiple lib source)
const libs: Map<string | symbol, WebinixLib> = new Map();
const defaultLib = Symbol("defaultLib");

//Register windows to bind instance to Webinix.Event
const windows: Map<Usize, Webinix> = new Map();

export class Webinix {
  #window: Usize;
  #lib: WebinixLib;

  /**
   * Loads webinix lib if not done and instanciate a new window.
   * @returns Window id.
   * @param libPath - Full lib path.Use a local lib instead of precached one.
   * @param clearCache - Clear the cache used by the default static import of webinix2 lib.
   * @throws {Error} If optional local lib not found.
   * @example
   * ```ts
   * const webinix1 = new Webinix()
   * const webinix2 = new Webinix({ libPath: './local_webinix_2.dll' })
   * ```
   */
  constructor(
    options: { libPath?: string; clearCache: boolean } = { clearCache: false },
  ) {
    if (options.libPath && !existsSync(options.libPath)) {
      throw new WebinixError(`File not found "${options.libPath}"`);
    }
    if (!libs.has(options.libPath ?? defaultLib)) {
      libs.set(options.libPath ?? defaultLib, loadLib(options));
    }
    this.#lib = libs.get(options.libPath ?? defaultLib)!;
    this.#window = this.#lib.symbols.webinix_new_window();
    windows.set(this.#window, this);
  }

  /**
   * Update the ui with the new content.
   * @param {string} content - valid html content or same root file path.
   * @example
   * ```ts
   * const webinix = new Webinix()
   * //Show the current time
   * webinix.show(`<html><p>It is ${new Date().toLocaleTimeString()}</p></html>`)
   * //Show a local file
   * webinix.show('list.txt')
   * ```
   */
  show(content: string) {
    const status = this.#lib.symbols.webinix_show(
      this.#window,
      toCString(content),
    );
    if (!status) {
      throw new WebinixError(`unable to show content`);
    }
  }

  /**
   * Update the ui with the new content with a specific browser.
   * @param {string} content - valid html content or same root file path.
   * @param {number} browser - Browser to use.
   * @example
   *  ```ts
   * const webinix = new Webinix()
   * //Show the current time
   * webinix.showBrowser(`<html><p>It is ${new Date().toLocaleTimeString()}</p></html>`, Webinix.Browser.Firefox)
   * //Show a local file
   * webinix.showBrowser('list.txt', Webui.Browser.Firefox)
   * ```
   */
  showBrowser(
    content: string,
    browser: Webinix.Browser,
  ) {
    const status = this.#lib.symbols.webinix_show_browser(
      this.#window,
      toCString(content),
      browser,
    );
    if (!status) {
      throw new WebinixError(`unable to show content`);
    }
  }

  /**
   * Checks if the window is currently running.
   * @returns Display state.
   * @example
   * ```ts
   * const webinix1 = new Webinix()
   * const webinix2 = new Webinix()
   * webinix1.show(`<html><p>View 1</p></html>`)
   *
   * webinix1.isShown //true
   * webinix2.isShown //false
   * ```
   */
  get isShown() {
    return this.#lib.symbols.webinix_is_shown(this.#window);
  }

  /**
   * Closes the current window.
   * If there is no running window left, Webinix.wait will break.
   * @example
   * ```ts
   * const webinix1 = new Webinix()
   * const webinix2 = new Webinix()
   * webinix1.show(`<html><p>View 1</p></html>`)
   * webinix2.show(`<html><p>View 2</p></html>`)
   *
   * webinix2.close()
   *
   * webinix1.isShown //true
   * webinix2.isShown //false
   * ```
   */
  close() {
    return this.#lib.symbols.webinix_close(this.#window);
  }

  /**
   * After the window is loaded, the URL is not valid anymore for safety.
   * Webinix will show an error if someone else tries to access the URL.
   * To allow multi-user access to the same URL, you can use multiAccess.
   * @param {boolean} status - Multi access status of the window.
   * @example
   * ```ts
   * const webinix = new Webinix()
   * webinix.setMultiAccess(true) //ui is accessible through the page url
   * ```
   */
  setMultiAccess(status: boolean) {
    return this.#lib.symbols.webinix_set_multi_access(this.#window, status);
  }

  /**
   * Tries to close all opened windows and make Webinix.wait break.
   * @example
   * ```ts
   * const webinix1 = new Webinix()
   * const webinix2 = new Webinix()
   * webinix1.show(`<html><p>View 1</p></html>`)
   * webinix2.show(`<html><p>View 2</p></html>`)
   *
   * Webinix.exit()
   * webinix1.isShown //false
   * webinix2.isShown //false
   * ```
   */
  static exit() {
    libs.forEach((lib) => lib.symbols.webinix_exit());
  }

  /**
   * Execute client code from backend.
   * Execute a JavaScript script string in a web UI and returns a boolean indicating whether the
   * script execution was successful.
   * @param {string} script - js code to execute.
   * @param options - response timeout (0 means no timeout) and bufferSize
   * @returns Promise that resolve or reject the client response.
   * @example
   * ```ts
   * const webinix = new Webinix()
   * webinix.show(
   *  `<html>
   *    <p id="text"></p>
   *     <script>
   *      function updateText(text) {
   *        document.getElementById('text').innerText = text
   *        return 'ok'
   *      }
   *    </script>
   *  </html>`
   * )
   *
   * const response = await webinix.script('updateText("backend action")').catch(console.error)
   * //response == "ok"
   * ```
   */
  script(
    script: string,
    options: {
      timeout: number;
      bufferSize: number;
    } = { timeout: 0, bufferSize: 1024 * 8 },
  ) {
    // Response Buffer
    const bufferSize = options.bufferSize > 0 ? options.bufferSize : 1024 * 8;
    const buffer = new Uint8Array(bufferSize);

    // Execute the script
    const status = this.#lib.symbols.webinix_script(
      this.#window,
      toCString(script),
      options.timeout,
      buffer,
      bufferSize,
    );

    const response = fromCString(buffer);

    //TODO call symbol asynchronously
    if (status) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  }

  /**
   * Execute client code from backend.
   * Execute a JavaScript script string in a web UI without awaiting the result.
   * @param {string} script - js code to execute.
   * @returns execution status.
   * @example
   * ```ts
   * const webinix = new Webinix()
   * webinix.show(
   *  `<html>
   *    <p id="text"></p>
   *     <script>
   *      function updateText(text) {
   *        document.getElementById('text').innerText = text
   *        return 'ok'
   *      }
   *    </script>
   *  </html>`
   * )
   *
   * webinix.run('updateText("backend action")')
   * ```
   */
  run(script: string): boolean {
    // Execute the script
    const status = this.#lib.symbols.webinix_run(
      this.#window,
      toCString(script),
    );

    return Boolean(status);
  }

  /**
   * The `bind` function in TypeScript binds a callback function to a web UI event, passing the event
   * details to the callback and sending back the response.
   * @param {string} idOrlabel - DOM element id or webinix label to bind the code with. Blank string bind to all DOM elements.
   * @param callback - Callback to execute.
   * If a value is returned by the callback it will be sent to client and must be a valid JSON value.
   * **Value will be stringified.**
   * @example
   * ```ts
   * const webinix = new Webinix()
   * webinix.show(
   *  `<html>
   *    <button id="btn"></button>
   *     <script>
   *      const response = await webinix_fn('myLabel', 'payload') //global function injected by webinix loader
   *    </script>
   *  </html>`
   * )
   *
   * webinix.bind('btn', ({ element }) => console.log(`${element} was clicked`))
   * webinix.bind('myLabel', ({ data }) => {
   *  console.log(`ui send "${data}"`)
   *  return "backend response"
   * })
   * webinix.bind('', (event) => console.log(`new ui event was fired (${JSON.stringify(event)})`))
   * ```
   */
  bind<T extends JSONValue | undefined | void>(
    idOrlabel: string,
    callback: BindCallback<T>,
  ) {
    const callbackResource = new Deno.UnsafeCallback(
      {
        // unsigned int webinix_interface_bind(..., void (*func)(size_t, unsigned int, char*, char*, unsigned int))
        parameters: ["usize", "u32", "pointer", "pointer", "u32"],
        result: "void",
      } as const,
      async (
        param_window: Usize,
        param_event_type: number,
        param_element: Deno.PointerValue,
        param_data: Deno.PointerValue,
        param_event_number: number,
      ) => {
        // Create elements
        const win = param_window;
        const event_type = Math.trunc(param_event_type);
        const element = param_element != null
          ? new Deno.UnsafePointerView(param_element).getCString()
          : "";
        const data = param_data != null
          ? new Deno.UnsafePointerView(param_data).getCString()
          : "";
        const event_number = Math.trunc(param_event_number);

        // Create struct
        const e: WebinixEvent = {
          window: windows.get(win)!,
          eventType: event_type,
          element: element,
          data: data,
        };

        // Call the user callback
        const result = JSON.stringify(await callback(e));

        // Send back the response
        this.#lib.symbols.webinix_interface_set_response(
          this.#window,
          event_number,
          toCString(result),
        );
      },
    );

    this.#lib.symbols.webinix_interface_bind(
      this.#window,
      toCString(idOrlabel),
      callbackResource.pointer,
    );
  }

  /**
   * Waits until all web UI was closed for preventing exiting the main thread.
   * @exemple
   * ```ts
   * const webinix = new Webinix()
   * webinix.show(`<html><p>Your page</p></html>`)
   * //code ...
   * webinix.show('list.txt')
   * //code ...
   * Webinix.wait() // aync wait until all windows are closed
   * ```
   */
  static async wait() {
    //Wait for all opened lib to resolve
    for (const lib of libs.values()) {
      await lib.symbols.webinix_wait();
    }
  }

  static get version() {
    return "2.3.0";
  }
}

//deno-lint-ignore no-namespace
export namespace Webinix {
  export type Event = WebinixEvent;
  export enum Browser {
    AnyBrowser, // 0. Default recommended web browser
    Chrome, // 1. Google Chrome
    Firefox, // 2. Mozilla Firefox
    Edge, // 3. Microsoft Edge
    Safari, // 4. Apple Safari
    Chromium, // 5. The Chromium Project
    Opera, // 6. Opera Browser
    Brave, // 7. The Brave Browser
    Vivaldi, // 8. The Vivaldi Browser
    Epic, // 9. The Epic Browser
    Yandex0, // 10. The Yandex Browser
  }
}
