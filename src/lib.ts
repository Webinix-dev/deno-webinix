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
      webinix_set_root_folder: {
          // bool webinix_set_root_folder(size_t window, const char* path)
          parameters: ["usize", "buffer"],
          result: "bool",
      },
      webinix_set_tls_certificate: {
          // bool webinix_set_tls_certificate(const char* certificate_pem, const char* private_key_pem)
          parameters: ["buffer", "buffer"],
          result: "bool",
      },
      webinix_set_kiosk: {
        // void webinix_set_kiosk(size_t window, bool status)
        parameters: ["usize", "bool"],
        result: "void",
      },
      webinix_destroy: {
        // void webinix_destroy(size_t window)
        parameters: ["usize"],
        result: "void",
      },
      webinix_set_timeout: {
        // void webinix_set_timeout(size_t second)
        parameters: ["usize"],
        result: "void",
      },
      webinix_set_icon: {
        // void webinix_set_icon(size_t window, const char* icon, const char* icon_type)
        parameters: ["usize", "buffer", "buffer"],
        result: "void",
      },
      webinix_encode: {
        // char* webinix_encode(const char* str)
        parameters: ["buffer"],
        result: "buffer",
      },
      webinix_decode: {
        // char* webinix_decode(const char* str)
        parameters: ["buffer"],
        result: "buffer",
      },
      webinix_free: {
        // void webinix_free(void* ptr)
        parameters: ["pointer"],
        result: "void",
      },
      webinix_malloc: {
        // void* webinix_malloc(size_t size)
        parameters: ["usize"],
        result: "pointer",
      },
      webinix_send_raw: {
        // void webinix_send_raw(size_t window, const char* function, const void* raw, size_t size)
        parameters: ["usize", "buffer", "buffer", "usize"],
        result: "void",
      },
      webinix_set_hide: {
        // void webinix_set_hide(size_t window, bool status)
        parameters: ["usize", "bool"],
        result: "void",
      },
      webinix_set_size: {
        // void webinix_set_size(size_t window, unsigned int width, unsigned int height)
        parameters: ["usize", "u32", "u32"],
        result: "void",
      },
      webinix_set_position: {
        // void webinix_set_position(size_t window, unsigned int x, unsigned int y)
        parameters: ["usize", "u32", "u32"],
        result: "void",
      },
      webinix_get_url: {
        // const char* webinix_get_url(size_t window)
        parameters: ["usize"],
        result: "buffer",
      },
      webinix_set_public: {
        // void webinix_set_public(size_t window, bool status)
        parameters: ["usize", "bool"],
        result: "void",
      },
      webinix_navigate: {
        // void webinix_navigate(size_t window, const char* url)
        parameters: ["usize", "buffer"],
        result: "void",
      },
      webinix_delete_all_profiles: {
        // void webinix_delete_all_profiles(void)
        parameters: [],
        result: "void",
      },
      webinix_delete_profile: {
        // void webinix_delete_profile(size_t window)
        parameters: ["usize"],
        result: "void",
      },
      webinix_get_parent_process_id: {
        // size_t webinix_get_parent_process_id(size_t window)
        parameters: ["usize"],
        result: "usize",
      },
      webinix_get_child_process_id: {
        // size_t webinix_get_child_process_id(size_t window)
        parameters: ["usize"],
        result: "usize",
      },
      webinix_set_port: {
        // bool webinix_set_port(size_t window, size_t port)
        parameters: ["usize", "usize"],
        result: "bool",
      },
      webinix_set_runtime: {
        // void webinix_set_runtime(size_t window, size_t runtime)
        parameters: ["usize", "usize"],
        result: "void",
      },
      webinix_set_config: {
        // void webinix_set_config(webinix_config option, bool status)
        //   show_wait_connection: 0
        //   ui_event_blocking: 1
        //   folder_monitor: 2
        //   multi_client: 3
        //   use_cookies: 4
        //   asynchronous_response: 5
        parameters: ["usize", "bool"],
        result: "void",
      },
      webinix_interface_show_client: {
        // bool webinix_interface_show_client(size_t window, size_t event_number, const char* content)
        parameters: ["usize", "usize", "buffer"],
        result: "bool",
      },
      webinix_interface_close_client: {
        // void webinix_interface_close_client(size_t window, size_t event_number)
        parameters: ["usize", "usize"],
        result: "void",
      },
      webinix_interface_send_raw_client: {
        // void webinix_interface_send_raw_client(
        //  size_t window, size_t event_number, const char* function, const void* raw, size_t size)
        parameters: ["usize", "usize", "buffer", "buffer", "usize"],
        result: "void",
      },
      webinix_interface_navigate_client: {
        // void webinix_interface_navigate_client(size_t window, size_t event_number, const char* url)
        parameters: ["usize", "usize", "buffer"],
        result: "void",
      },
      webinix_interface_run_client: {
        // void webinix_interface_run_client(size_t window, size_t event_number, const char* script)
        parameters: ["usize", "usize", "buffer"],
        result: "void",
      },
      webinix_interface_script_client: {
        // bool webinix_interface_script_client(
        //  size_t window, size_t event_number, const char* script, size_t timeout, char* buffer, size_t buffer_length)
        parameters: ["usize", "usize", "buffer", "usize", "buffer", "usize"],
        result: "bool",
      },
      webinix_interface_set_response_file_handler: {
        // void webinix_interface_set_response_file_handler(size_t window, const void* response, int length)
        parameters: ["usize", "buffer", "usize"],
        result: "void",
      }
    } as const,
  );
}
