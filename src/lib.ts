// FFI (Foreign Function Interface) for webinix.ts

import {
  webinixLinuxClangX64,
  webinixLinuxGccAarch64,
  webinixLinuxGccArm,
  webinixLinuxGccX64,
  webinixMacosClangArm64,
  webinixMacosClangX64,
  webinixWindowsGccX64,
  webinixWindowsMsvcX64,
} from "../deps.ts";
import { b64ToBuffer, writeLib } from "./utils.ts";
export function loadLib(
  { libPath, clearCache }: { libPath?: string; clearCache: boolean },
) {
  // Determine the library name based
  // on the current operating system
  const libName = (() => {
    let fileName = "";
    switch (Deno.build.os) {
      case "windows":
        switch (Deno.build.arch) {
          case "x86_64":
            fileName = "webinix-windows-msvc-x64/webinix-2.dll";
            break;
          default:
            throw new Error(
              `Unsupported architecture ${Deno.build.arch} for Windows`,
            );
        }
        break;
      case "darwin":
        switch (Deno.build.arch) {
          case "x86_64":
            fileName = "webinix-macos-clang-x64/webinix-2.dylib";
            break;
          // case "arm64":
          //   fileName = "webinix-macos-clang-arm64/webinix-2.dylib";
          //   break;
          case "aarch64":
            fileName = "webinix-macos-clang-arm64/webinix-2.dylib";
            break;
          default:
            throw new Error(
              `Unsupported architecture ${Deno.build.arch} for Darwin`,
            );
        }
        break;
      default:
        // Assuming Linux for default
        switch (Deno.build.arch) {
          case "x86_64":
            fileName = "webinix-linux-gcc-x64/webinix-2.so";
            break;
          // case "arm":
          //   fileName = "webinix-linux-gcc-arm/webinix-2.so";
          //   break;
          case "aarch64":
            fileName = "webinix-linux-gcc-aarch64/webinix-2.so";
            break;
          default:
            throw new Error(
              `Unsupported architecture ${Deno.build.arch} for Linux`,
            );
        }
        break;
    }
    return fileName;
  })();

  const libBuffer = (() => {
    if (libPath === undefined) {
      switch (Deno.build.os) {
        case "windows":
          switch (Deno.build.arch) {
            case "x86_64":
              return b64ToBuffer(webinixWindowsMsvcX64.b64);
            default:
              throw new Error(
                `Unsupported architecture ${Deno.build.arch} for Windows`,
              );
          }
        case "darwin":
          switch (Deno.build.arch) {
            case "x86_64":
              return b64ToBuffer(webinixMacosClangX64.b64);
            case "aarch64":
              return b64ToBuffer(webinixMacosClangArm64.b64);
            // case "arm64":
            //   return b64ToBuffer(webinixMacosClangArm64.b64);
            default:
              throw new Error(
                `Unsupported architecture ${Deno.build.arch} for Darwin`,
              );
          }
        default:
          // Assuming Linux for default
          switch (Deno.build.arch) {
            case "x86_64":
              return b64ToBuffer(webinixLinuxGccX64.b64);
            // case "arm":
            //   return b64ToBuffer(webinixLinuxGccArm.b64);
            case "aarch64":
              return b64ToBuffer(webinixLinuxGccArm.b64);
            default:
              throw new Error(
                `Unsupported architecture ${Deno.build.arch} for Linux`,
              );
          }
      }
    }
    return new Uint8Array();
  })();

  // Use user defined lib or cached one
  const libFullPath = libPath ?? writeLib(libName, libBuffer, clearCache);

  return Deno.dlopen(
    libFullPath,
    {
      webinix_wait: {
        // void webinix_wait(void)
        parameters: [],
        result: "void",
        nonblocking: true,
      },
      webinix_new_window: {
        // size_t webinix_new_window(void)
        parameters: [],
        result: "usize",
      },
      webinix_show: {
        // bool webinix_show(size_t window, const char* content)
        parameters: ["usize", "buffer"],
        result: "bool",
      },
      webinix_show_browser: {
        // bool webinix_show_browser(size_t window, const char* content, size_t browser)
        parameters: ["usize", "buffer", "usize"],
        result: "bool",
      },
      webinix_interface_bind: {
        // size_t webinix_interface_bind(size_t window, const char* element, void (*func)(size_t, size_t, char*, char*, size_t, size_t))
        parameters: ["usize", "buffer", "function"],
        result: "usize",
      },
      webinix_script: {
        // bool webinix_script(size_t window, const char* script, size_t timeout, char* buffer, size_t buffer_length)
        parameters: ["usize", "buffer", "usize", "buffer", "usize"],
        result: "bool",
      },
      webinix_run: {
        // void webinix_run(size_t window, const char* script)
        parameters: ["usize", "buffer"],
        result: "void",
      },
      webinix_interface_set_response: {
        // void webinix_interface_set_response(size_t window, size_t event_number, const char* response)
        parameters: ["usize", "usize", "buffer"],
        result: "void",
      },
      webinix_exit: {
        // void webinix_exit(void)
        parameters: [],
        result: "void",
      },
      webinix_is_shown: {
        // bool webinix_is_shown(size_t window)
        parameters: ["usize"],
        result: "bool",
      },
      webinix_close: {
        // void webinix_close(size_t window)
        parameters: ["usize"],
        result: "void",
      },
      webinix_set_file_handler: {
        // void webinix_set_file_handler(size_t window, const void* (*handler)(const char* filename, int* length))
        parameters: ["usize", "function"],
        result: "void",
      },
      webinix_interface_is_app_running: {
        // bool webinix_interface_is_app_running(void)
        parameters: [],
        result: "bool",
      },
      webinix_set_profile: {
        // void webinix_set_profile(size_t window, const char* name, const char* path)
        parameters: ["usize", "buffer", "buffer"],
        result: "void",
      },
    } as const,
  );
}
