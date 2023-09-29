// Dependences needed by webinix.ts

export { existsSync } from "https://deno.land/std@0.192.0/fs/mod.ts";
export * as path from "https://deno.land/std@0.192.0/path/mod.ts";
export * as fs from "https://deno.land/std@0.192.0/fs/mod.ts";
export { default as CRC32 } from "npm:crc-32@1.2.2";

// Preload lib files statically

// Linux Clang x64
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinixLinuxClangX64,
} from "https://ejm.sh/github.com/webinix-dev/deno-webinix/blob/main/src/webinix-linux-clang-x64/webinix-2.so" assert {
  type: "json",
};

// Linux GCC aarch64
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinixLinuxGccAarch64,
} from "https://ejm.sh/github.com/webinix-dev/deno-webinix/blob/main/src/webinix-linux-gcc-aarch64/webinix-2.so" assert {
  type: "json",
};

// Linux GCC arm
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinixLinuxGccArm,
} from "https://ejm.sh/github.com/webinix-dev/deno-webinix/blob/main/src/webinix-linux-gcc-arm/webinix-2.so" assert {
  type: "json",
};

// Linux GCC x64
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinixLinuxGccX64,
} from "https://ejm.sh/github.com/webinix-dev/deno-webinix/blob/main/src/webinix-linux-gcc-x64/webinix-2.so" assert {
  type: "json",
};

// MacOS Clang arm64
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinixMacosClangArm64,
} from "https://ejm.sh/github.com/webinix-dev/deno-webinix/blob/main/src/webinix-macos-clang-arm64/webinix-2.dylib" assert {
  type: "json",
};

// MacOS Clang x64
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinixMacosClangX64,
} from "https://ejm.sh/github.com/webinix-dev/deno-webinix/blob/main/src/webinix-macos-clang-x64/webinix-2.dylib" assert {
  type: "json",
};

// Windows GCC x64
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinixWindowsGccX64,
} from "https://ejm.sh/github.com/webinix-dev/deno-webinix/blob/main/src/webinix-windows-gcc-x64/webinix-2.dll" assert {
  type: "json",
};

// Windows MSVC x64
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinixWindowsMsvcX64,
} from "https://ejm.sh/github.com/webinix-dev/deno-webinix/blob/main/src/webinix-windows-msvc-x64/webinix-2.dll" assert {
  type: "json",
};
