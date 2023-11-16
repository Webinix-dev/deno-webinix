// Deno Webinix
// FFI (Foreign Function Interface) for webinix.ts

import {
  libName,
} from "../deps.ts";

export function loadLib() {
  return Deno.dlopen(
    libName,
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
        // size_t webinix_interface_bind(size_t window, const char* element, void (*func)(size_t, size_t, char*, size_t, size_t));
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
      webinix_interface_get_int_at: {
        // long long int webinix_interface_get_int_at(size_t window, size_t event_number, size_t index)
        parameters: ["usize", "usize", "usize"],
        result: "i64",
      },
      webinix_interface_get_string_at: {
        // const char* webinix_interface_get_string_at(size_t window, size_t event_number, size_t index)
        parameters: ["usize", "usize", "usize"],
        result: "buffer",
      },
      webinix_interface_get_bool_at: {
        // bool webinix_interface_get_bool_at(size_t window, size_t event_number, size_t index)
        parameters: ["usize", "usize", "usize"],
        result: "bool",
      },
      // webinix_interface_get_size_at: {
      //   // size_t webinix_interface_get_size_at(size_t window, size_t event_number, size_t index)
      //   parameters: ["usize", "usize", "usize"],
      //   result: "usize",
      // },
      webinix_clean: {
        // void webinix_clean()
        parameters: [],
        result: "void",
      },
    } as const,
  );
}
