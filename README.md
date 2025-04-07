<div align="center">

![Logo](https://raw.githubusercontent.com/webinix-dev/webinix-logo/main/webinix_deno.png)

# Deno-Webinix v2.5.3 (Beta)

[last-commit]: https://img.shields.io/github/last-commit/webinix-dev/webinix?style=for-the-badge&logo=github&logoColor=C0CAF5&labelColor=414868
[release-version]: https://img.shields.io/github/v/tag/webinix-dev/webinix?style=for-the-badge&logo=webtrees&logoColor=C0CAF5&labelColor=414868&color=7664C6
[license]: https://img.shields.io/github/license/webinix-dev/webinix?style=for-the-badge&logo=opensourcehardware&label=License&logoColor=C0CAF5&labelColor=414868&color=8c73cc

[![][last-commit]](https://github.com/webinix-dev/deno-webinix/pulse)
[![][release-version]](https://github.com/webinix-dev/deno-webinix/releases/latest)
[![][license]](https://github.com/webinix-dev/deno-webinix/blob/main/LICENSE)

> Use any web browser or WebView as GUI, with your preferred language in the
> backend and modern web technologies in the frontend, all in a lightweight
> portable library.

![Screenshot](https://raw.githubusercontent.com/webinix-dev/webinix-logo/main/screenshot.png)

</div>

## Download

- [Latest Stable Release](https://github.com/webinix-dev/deno-webinix/releases)

## Features

- Portable (_Needs only a web browser or a WebView at runtime_)
- Lightweight (_Few Kb library_) & Small memory footprint
- Fast binary communication protocol
- Multi-platform & Multi-Browser
- Using private profile for safety
- Cross-platform WebView

## Screenshot

This
[hello world example](https://github.com/webinix-dev/deno-webinix/tree/main/examples/hello_world)
is written in Deno using Webinix as the GUI library.

![ScreenShot](img/webinix_deno_example.png)

## Installation

Specific version:
`import { Webinix } from "https://deno.land/x/webinix@2.5.3/mod.ts";`

Latest version: `import { Webinix } from "https://deno.land/x/webinix/mod.ts";`

## Minimal Example

```js
import { Webinix } from "https://deno.land/x/webinix@2.5.3/mod.ts";

const myWindow = new Webinix();
myWindow.show('<html><script src="webinix.js"></script> Hello World! </html>');
await Webinix.wait();
```

```sh
deno run --allow-read --allow-write --allow-run --allow-net --allow-ffi minimal.ts
```

[More examples](https://github.com/webinix-dev/deno-webinix/tree/main/examples)

## Documentation

- [Online Documentation](https://webinix.me/docs/2.5/#/)

## CppCon 2019 Presentation

[Borislav Stanimirov](https://ibob.bg/) explained at
[C++ Conference 2019 (_YouTube_)](https://www.youtube.com/watch?v=bbbcZd4cuxg)
how beneficial it is to use the web browser as GUI.

<!-- <div align="center">
  <a href="https://www.youtube.com/watch?v=bbbcZd4cuxg"><img src="https://img.youtube.com/vi/bbbcZd4cuxg/0.jpg" alt="Embrace Modern Technology: Using HTML 5 for GUI in C++ - Borislav Stanimirov - CppCon 2019"></a>
</div> -->

![ScreenShot](img/cppcon_2019.png)

## UI & The Web Technologies

Web application UI design is not just about how a product looks but how it
works. Using web technologies in your UI makes your product modern and
professional, And a well-designed web application will help you make a solid
first impression on potential customers. Great web application design also
assists you in nurturing leads and increasing conversions. In addition, it makes
navigating and using your web app easier for your users.

## Why Use Web Browser?

Today's web browsers have everything a modern UI needs. Web browsers are very
sophisticated and optimized. Therefore, using it as a GUI will be an excellent
choice. While old legacy GUI lib is complex and outdated, a WebView-based app is
still an option. However, a WebView needs a huge SDK to build and many
dependencies to run, and it can only provide some features like a real web
browser. That is why Webinix uses real web browsers to give you full features of
comprehensive web technologies while keeping your software lightweight and
portable.

## How does it work?

![ScreenShot](img/webinix_diagram.png)

Think of Webinix like a WebView controller, but instead of embedding the WebView
controller in your program, which makes the final program big in size, and
non-portable as it needs the WebView runtimes. Instead, by using Webinix, you use
a tiny static/dynamic library to run any installed web browser and use it as
GUI, which makes your program small, fast, and portable. **All it needs is a web
browser**.

## Runtime Dependencies Comparison

|                                 | Tauri / WebView   | Qt                         | Webinix               |
| ------------------------------- | ----------------- | -------------------------- | ------------------- |
| Runtime Dependencies on Windows | _WebView2_        | _QtCore, QtGui, QtWidgets_ | **_A Web Browser_** |
| Runtime Dependencies on Linux   | _GTK3, WebKitGTK_ | _QtCore, QtGui, QtWidgets_ | **_A Web Browser_** |
| Runtime Dependencies on macOS   | _Cocoa, WebKit_   | _QtCore, QtGui, QtWidgets_ | **_A Web Browser_** |

## Supported Web Browsers

| Browser         | Windows         | macOS         | Linux           |
| --------------- | --------------- | ------------- | --------------- |
| Mozilla Firefox | ✔️              | ✔️            | ✔️              |
| Google Chrome   | ✔️              | ✔️            | ✔️              |
| Microsoft Edge  | ✔️              | ✔️            | ✔️              |
| Chromium        | ✔️              | ✔️            | ✔️              |
| Yandex          | ✔️              | ✔️            | ✔️              |
| Brave           | ✔️              | ✔️            | ✔️              |
| Vivaldi         | ✔️              | ✔️            | ✔️              |
| Epic            | ✔️              | ✔️            | _not available_ |
| Apple Safari    | _not available_ | _coming soon_ | _not available_ |
| Opera           | _coming soon_   | _coming soon_ | _coming soon_   |

## Supported Languages

| Language       | v2.4.0 API     | v2.5.0 API     | Link                                                              |
| -------------- | -------------- | -------------- | ----------------------------------------------------------------- |
| Python         | ✔️             | _not complete_ | [Python-Webinix](https://github.com/webinix-dev/python-webinix)         |
| Go             | ✔️             | _not complete_ | [Go-Webinix](https://github.com/webinix-dev/go-webinix)                 |
| Zig            | ✔️             | _not complete_ | [Zig-Webinix](https://github.com/webinix-dev/zig-webinix)               |
| Nim            | ✔️             | _not complete_ | [Nim-Webinix](https://github.com/webinix-dev/nim-webinix)               |
| V              | ✔️             | _not complete_ | [V-Webinix](https://github.com/webinix-dev/v-webinix)                   |
| Rust           | _not complete_ | _not complete_ | [Rust-Webinix](https://github.com/webinix-dev/rust-webinix)             |
| TS / JS (Deno) | ✔️             | _not complete_ | [Deno-Webinix](https://github.com/webinix-dev/deno-webinix)             |
| TS / JS (Bun)  | _not complete_ | _not complete_ | [Bun-Webinix](https://github.com/webinix-dev/bun-webinix)               |
| Swift          | _not complete_ | _not complete_ | [Swift-Webinix](https://github.com/webinix-dev/swift-webinix)           |
| Odin           | _not complete_ | _not complete_ | [Odin-Webinix](https://github.com/webinix-dev/odin-webinix)             |
| Pascal         | _not complete_ | _not complete_ | [Pascal-Webinix](https://github.com/webinix-dev/pascal-webinix)         |
| Purebasic      | _not complete_ | _not complete_ | [Purebasic-Webinix](https://github.com/webinix-dev/purebasic-webinix)   |
| -              |                |                |                                                                   |
| Common Lisp    | _not complete_ | _not complete_ | [cl-webinix](https://github.com/garlic0x1/cl-webinix)                 |
| Delphi         | _not complete_ | _not complete_ | [Webinix4Delphi](https://github.com/salvadordf/Webinix4Delphi)        |
| C#             | _not complete_ | _not complete_ | [Webinix4CSharp](https://github.com/salvadordf/Webinix4CSharp)        |
| Webinix.NET      | _not complete_ | _not complete_ | [Webinix.NET](https://github.com/Juff-Ma/Webinix.NET)                 |
| QuickJS        | _not complete_ | _not complete_ | [QuickUI](https://github.com/xland/QuickUI)                       |
| PHP            | _not complete_ | _not complete_ | [PHPWebUiComposer](https://github.com/KingBes/php-webinix-composer) |

## Supported WebView

| WebView           | Status |
| ----------------- | ------ |
| Windows WebView2  | ✔️     |
| Linux GTK WebView | ✔️     |
| macOS WKWebView   | ✔️     |

### License

> Licensed under MIT License.

### Stargazers

[![Stargazers repo roster for @webinix-dev/deno-webinix](https://reporoster.com/stars/webinix-dev/deno-webinix)](https://github.com/webinix-dev/deno-webinix/stargazers)
