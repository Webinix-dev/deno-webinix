// Preload lib files statically
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinix2Darwin,
} from "https://ejm.sh/github.com/7flash/deno-webinix/blob/main/src/webinix-macos-clang-x64/webinix-2.dylib" assert {
  type: "json",
};
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinix2Windows,
} from "https://ejm.sh/github.com/7flash/deno-webinix/blob/main/src/webinix-windows-msvc-x64/webinix-2.dll" assert {
  type: "json",
};
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinix2Linux,
} from "https://ejm.sh/github.com/7flash/deno-webinix/blob/main/src/webinix-linux-gcc-x64/webinix-2.so" assert {
  type: "json",
};

export { existsSync } from "https://deno.land/std@0.192.0/fs/mod.ts";
export * as path from "https://deno.land/std@0.192.0/path/mod.ts";
export * as fs from "https://deno.land/std@0.192.0/fs/mod.ts";
export { default as CRC32 } from "npm:crc-32@1.2.2";
