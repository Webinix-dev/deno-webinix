// Deno Webinix
// Dependences needed by webinix.ts

import { 
  fileExists,
  downloadCoreLibrary,
  currentModulePath
} from "./src/utils.ts";

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
  // Get the current module full path
  const srcFullPath = currentModulePath;
  const FullPath = srcFullPath + fileName;
  // Check if Webinix library exist
  const exists = await fileExists(FullPath);
  if (!exists) {
    // Download the Webinix library
    await downloadCoreLibrary();
  }
  return FullPath;
}

export const libName = await getLibName();
