// Deno Webinix
// Dependences needed by webinix.ts

// Get the current module full path
const currentModulePath = (() => {
  const __dirname = new URL('.', import.meta.url).pathname;
  let directory = String(__dirname);
  if (Deno.build.os === 'windows') {
    // Remove first '/'
    directory = directory.substring(1);
  }
  return directory;
})();

// Determine the library name based
// on the current operating system
export const libName = (() => {
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
  return currentModulePath + '/src/' + fileName;
})();
