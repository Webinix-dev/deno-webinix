// Deno Webinix
// Dependences needed by webinix.ts

import { 
  fileExists,
  runCommand
} from "./src/utils.ts";

// Get the current module full path
const currentModulePath = (() => {
  const __dirname = new URL('.', import.meta.url).pathname;
  let directory = String(__dirname);
  if (Deno.build.os === 'windows') {
    if (directory.startsWith('/')) {
      // Remove first '/'
      directory = directory.slice(1);
    }
  }
  return directory;
})();

// Determine the library name based
// on the current operating system
async function getLibName() {
  let fileName = "";
  switch (Deno.build.os) {
    case "windows":
      switch (Deno.build.arch) {
        case "x86_64":
          fileName = "webinix-windows-msvc-x64/webinix-2.dll";
          break;
        case "arm":
          fileName = "webinix-windows-msvc-arm/webinix-2.dll";
          break;
        case "arm64":
        case "aarch64":
          fileName = "webinix-windows-msvc-arm64/webinix-2.dll";
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
        case "arm":
          fileName = "webinix-macos-clang-arm/webinix-2.dylib";
          break;
        case "arm64":
        case "aarch64":
          fileName = "webinix-macos-clang-arm64/webinix-2.dylib";
          break;
        default:
          throw new Error(
            `Unsupported architecture ${Deno.build.arch} for macOS`,
          );
      }
      break;
    default:
      // Assuming Linux for default
      switch (Deno.build.arch) {
        case "x86_64":
          fileName = "webinix-linux-gcc-x64/webinix-2.so";
          break;
        case "arm":
          fileName = "webinix-linux-gcc-arm/webinix-2.so";
          break;
        case "arm64":
        case "aarch64":
          fileName = "webinix-linux-gcc-arm64/webinix-2.so";
          break;
        default:
          throw new Error(
            `Unsupported architecture ${Deno.build.arch} for Linux`,
          );
      }
      break;
  }
  const srcFullPath = currentModulePath + '/src/';
  const FullPath = srcFullPath + fileName;
  const exists = await fileExists(FullPath);
  if (!exists) {
    // Run bootstrap script to download Webinix binaries
    switch (Deno.build.os) {
      case "windows":
        // Windows
        let path = srcFullPath.replace(/\//g, "\\");
        await runCommand(["cmd.exe", "/c", `cd ${path} && bootstrap.bat minimal`]);
        break;
      default:
        // Linux - macOS
        // TODO: Run: cd {srcFullPath} && sh bootstrap.sh minimal
        //
        // await runCommand(["/bin/bash", "-c", `cd ${srcFullPath} && sh bootstrap.sh minimal`]);
    }
  }
  return FullPath;
}

export const libName = await getLibName();
