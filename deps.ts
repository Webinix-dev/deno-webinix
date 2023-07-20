//Preload lib files statically
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinix2Darwin,
} from "https://ejm.sh/raw.githubusercontent.com/webinix-dev/deno-webinix/6fa36e7c15b6ea643e52d9edfcd2fac102d313ce/src/webinix-2-x64.dyn" assert {
  type: "json",
};
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinix2Windows,
} from "https://ejm.sh/raw.githubusercontent.com/webinix-dev/deno-webinix/6fa36e7c15b6ea643e52d9edfcd2fac102d313ce/src/webinix-2-x64.dll" assert {
  type: "json",
};
export {
  //@ts-ignore ejm serve { b64: string }
  default as webinix2Linux,
} from "https://ejm.sh/raw.githubusercontent.com/webinix-dev/deno-webinix/6fa36e7c15b6ea643e52d9edfcd2fac102d313ce/src/webinix-2-x64.so" assert {
  type: "json",
};

export { existsSync } from "https://deno.land/std@0.192.0/fs/mod.ts";
export * as path from "https://deno.land/std@0.192.0/path/mod.ts";
export * as fs from "https://deno.land/std@0.192.0/fs/mod.ts";
export { default as CRC32 } from "npm:crc-32@1.2.2";
