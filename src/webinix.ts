/*
  Webinix Library 2.3.0

  http://webinix.me
  https://github.com/webinix-dev/deno-webinix

  Copyright (c) 2020-2023 Hassan Draga.
  Licensed under MIT License.
  All rights reserved.
  Canada.
*/

import { existsSync } from "https://deno.land/std@0.181.0/fs/mod.ts";

export const version = "2.3.0";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const browser = {
  AnyBrowser: 0, // 0. Default recommended web browser
  Chrome: 1, // 1. Google Chrome
  Firefox: 2, // 2. Mozilla Firefox
  Edge: 3, // 3. Microsoft Edge
  Safari: 4, // 4. Apple Safari
  Chromium: 5, // 5. The Chromium Project
  Opera: 6, // 6. Opera Browser
  Brave: 7, // 7. The Brave Browser
  Vivaldi: 8, // 8. The Vivaldi Browser
  Epic: 9, // 9. The Epic Browser
  Yandex: 10, // 10. The Yandex Browser
};

type Usize = number | bigint;
type BindCallback<T extends string | number | boolean | undefined | void> = (
  event: Event,
) => T;

export interface Event {
  win: Usize;
  eventType: number;
  element: string;
  data: string;
}

export const js = {
  timeout: 0,
  bufferSize: 1024 * 8,
  response: "",
};

interface Js {
  timeout: number;
  bufferSize: number;
  response: string;
}

// Determine the library name based
// on the current operating system
let libName: string;
let osSep: string;
if (Deno.build.os === "windows") {
  libName = "webinix-2-x64.dll";
  osSep = "\\";
} else if (Deno.build.os === "linux") {
  libName = "webinix-2-x64.so";
  osSep = "/";
} else {
  libName = "webinix-2-x64.dyn";
  osSep = "/";
}

// Full path to the library name
let libPath = "./" + libName;

// Check if a file exist
function isFileExist(path: string): boolean {
  // TODO: existsSync() is deprecated
  return existsSync(path);
}

// Convert String to C-String
function stringToUint8array(value: string): Uint8Array {
  return encoder.encode(value + "\0");
}

// Get current folder path
function getCurrentModulePath(): string {
  const __dirname = new URL(".", import.meta.url).pathname;
  let directory = String(__dirname);
  if (Deno.build.os === "windows") {
    // Remove '/'
    let buf = directory.substring(1);
    directory = buf;
    // Replace '/' by '\'
    buf = directory.replaceAll("/", osSep);
    directory = buf;
  }
  return directory;
}

// Convert C-String to String
function uint8arrayToString(value: ArrayBuffer): string {
  return decoder.decode(value);
}

// Load the library

// Check if the library file exist
if (!isFileExist(libPath)) {
  const libPathCwd = getCurrentModulePath() + libName;
  if (!isFileExist(libPathCwd)) {
    console.log(
      "Webinix Error: File not found (" +
        libPath +
        ") or (" +
        libPathCwd +
        ")",
    );
    Deno.exit(1);
  }
  libPath = libPathCwd;
}

// Load the library
// FFI
const webinixLib = Deno.dlopen(
  libPath,
  {
    webinix_wait: {
      // void webinix_wait(void)
      parameters: [],
      result: "void",
      nonblocking: true,
    },
    webinix_interface_is_app_running: {
      // bool webinix_interface_is_app_running(void)
      parameters: [],
      result: "i32",
    },
    webinix_new_window: {
      // size_t webinix_new_window(void)
      parameters: [],
      result: "usize",
    },
    webinix_show: {
      // bool webinix_show(size_t window, const char* content)
      parameters: ["usize", "buffer"],
      result: "i32",
    },
    webinix_show_browser: {
      // bool webinix_show_browser(size_t window, const char* content, unsigned int browser)
      parameters: ["usize", "buffer", "u32"],
      result: "i32",
    },
    webinix_interface_bind: {
      // unsigned int webinix_interface_bind(size_t window, const char* element, void (*func)(size_t, unsigned int, char*, char*, unsigned int))
      parameters: ["usize", "buffer", "function"],
      result: "u32",
    },
    webinix_script: {
      // bool webinix_script(size_t window, const char* script, unsigned int timeout, char* buffer, size_t buffer_length)
      parameters: ["usize", "buffer", "u32", "buffer", "i32"],
      result: "i32",
    },
    webinix_run: {
      // bool webinix_run(size_t window, const char* script)
      parameters: ["usize", "buffer"],
      result: "i32",
    },
    webinix_interface_set_response: {
      // void webinix_interface_set_response(size_t window, unsigned int event_number, const char* response)
      parameters: ["usize", "u32", "buffer"],
      result: "void",
    },
    webinix_exit: {
      // void webinix_exit(void)
      parameters: [],
      result: "void",
    },
    webinix_is_shown: {
      //bool webinix_is_shown(size_t window)
      parameters: ["usize"],
      result: "bool",
    },
    webinix_close: {
      //void webinix_close(size_t window)
      parameters: ["usize"],
      result: "void",
    },
    webinix_set_multi_access: {
      //void webinix_set_multi_access(size_t window, bool status)
      parameters: ["usize", "bool"],
      result: "void",
    },
  } as const,
);

export function setLibPath(path: string) {
  libPath = path;
}

export function newWindow(): Usize {
  return webinixLib.symbols.webinix_new_window();
}

export function show(win: Usize, content: string): number {
  return webinixLib.symbols.webinix_show(win, stringToUint8array(content));
}

export function showBrowser(
  win: Usize,
  content: string,
  browser: number,
): number {
  return webinixLib.symbols.webinix_show_browser(
    win,
    stringToUint8array(content),
    browser,
  );
}

export function isShown(win: Usize) {
  return webinixLib.symbols.webinix_is_shown(win);
}
export function close(win: Usize) {
  return webinixLib.symbols.webinix_close(win);
}
export function setMultiAccess(win: Usize, status: boolean) {
  return webinixLib.symbols.webinix_set_multi_access(win, status);
}

export function exit() {
  webinixLib.symbols.webinix_exit();
}

export function script(win: Usize, js: Js, script: string): boolean {
  // Response Buffer
  const size: number = js.bufferSize > 0 ? js.bufferSize : 1024 * 8;
  const buffer = new Uint8Array(size);

  // Execute the script
  const status = webinixLib.symbols.webinix_script(
    win,
    stringToUint8array(script),
    js.timeout,
    buffer,
    size,
  );

  // Update
  js.response = String(uint8arrayToString(buffer));

  return Boolean(status);
}

export function run(win: Usize, script: string): boolean {
  // Execute the script
  const status = webinixLib.symbols.webinix_run(
    win,
    stringToUint8array(script),
  );

  return Boolean(status);
}

export function bind<T extends string | number | boolean | undefined | void>(
  win: Usize,
  element: string,
  func: BindCallback<T>,
) {
  const callbackResource = new Deno.UnsafeCallback(
    {
      // unsigned int webinix_interface_bind(..., void (*func)(size_t, unsigned int, char*, char*, unsigned int))
      parameters: ["usize", "u32", "pointer", "pointer", "u32"],
      result: "void",
    } as const,
    (
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
      const e: Event = {
        win: win,
        eventType: event_type,
        element: element,
        data: data,
      };

      // Call the user callback
      const result = String(func(e));

      // Send back the response
      webinixLib.symbols.webinix_interface_set_response(
        win,
        event_number,
        stringToUint8array(result),
      );
    },
  );

  webinixLib.symbols.webinix_interface_bind(
    win,
    stringToUint8array(element),
    callbackResource.pointer,
  );
}

// TODO: We should use the Non-blocking FFI to call
// `webinix_lib.symbols.webinix_wait()`. but it breaks
// the Deno script main thread. Lets do it in another way for now.
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export async function wait() {
  while (true) {
    await sleep(10);
    if (!webinixLib.symbols.webinix_interface_is_app_running()) break;
  }
}
