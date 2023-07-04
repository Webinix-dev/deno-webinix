import { webinix2Darwin, webinix2Linux, webinix2Windows } from "../deps.ts";
import { b64ToBuffer, writeLib } from "./utils.ts";
export async function loadLib(libPath?: string) {
  // Determine the library name based
  // on the current operating system
  const libName = (() => {
    switch (Deno.build.os) {
      case "windows":
        return "webinix-2-x64.dll";
      case "darwin":
        return "webinix-2-x64.dyn";
      default:
        return "webinix-2-x64.so";
    }
  })();

  const libBuffer = (() => {
    if (libPath === undefined) {
      switch (Deno.build.os) {
        case "windows":
          return b64ToBuffer(webinix2Windows.b64);
        case "darwin":
          return b64ToBuffer(webinix2Darwin.b64);
        default:
          return b64ToBuffer(webinix2Linux.b64);
      }
    }
    return new Uint8Array();
  })();

  // Use user defined lib or cached one
  const libFullPath = libPath ?? await writeLib(libName, libBuffer);

  return Deno.dlopen(
    libFullPath,
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
}
