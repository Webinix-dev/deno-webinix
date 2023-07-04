// Run this script by:
// deno run --allow-all --unstable hello_world.ts

// Import Webinix module (Local file)
import { webinix } from "../mod.ts";

// Optional - Set a custom library path:
//  const libFullPath = 'webinix-2-x64.dll';
//  console.log("Looking for the Webinix dynamic library at: " + libFullPath);
//  webinix.setLibPath(libFullPath);

const myHtml = `
<!DOCTYPE html>
<html>
	<head>
		<title>Webinix 2 - Deno Hello World Example</title>
        <style>
            body {
                color: white;
                background: #101314;
                background: linear-gradient(to right, #101314, #0f1c20, #061f2a);
                text-align: center;
                font-size: 16px;
                font-family: sans-serif;
            }
        </style>
    </head>
    <body>
        <h1>Webinix 2 - Deno Hello World Example</h1><br>
        A: <input id="MyInputA" value="4"><br><br>
        B: <input id="MyInputB" value="6"><br><br>
        <div id="Result" style="color: #dbdd52">A + B = ?</div><br><br>
	    <button id="Calculate">Calculate</button> - <button id="Exit">Exit</button>
        <script>
            function get_A() {
              return parseInt(document.getElementById('MyInputA').value);
            }

            function get_B() {
              return parseInt(document.getElementById('MyInputB').value);
            }

            function set_result(res) {
              document.getElementById("Result").innerHTML = 'A + B = ' + res;
            }
        </script>
    </body>
</html>
`;

function calculate(e: webinix.Event) {
  // Create a JavaScript object
  const myJs = webinix.js;

  // Settings if needed
  // my_js.timeout = 30; // Set javascript execution timeout
  // my_js.response_size = 64; // Set the response size in bytes

  // Call a js function
  if (!webinix.script(e.win, myJs, "return get_A()")) {
    // Error
    console.log("Error in the JavaScript: " + myJs.response);
    return;
  }

  // Get A
  const A = myJs.response;

  // Call a js function
  if (!webinix.script(e.win, myJs, "return get_B();")) {
    // Error
    console.log("Error in the JavaScript: " + myJs.response);
    return;
  }

  // Get B
  const B = myJs.response;

  // Calculate
  const C: number = parseInt(A) + parseInt(B);

  // Run js (Quick Way)
  webinix.run(e.win, "set_result(" + C + ");");
}

// Create new window
const myWindow = await webinix.newWindow();

// Bind
webinix.bind(myWindow, "Calculate", calculate);
webinix.bind(myWindow, "Exit", function (_e: webinix.Event) {
  // Close all windows and exit
  webinix.exit();
});

// Show the window
webinix.show(myWindow, myHtml); // Or webinix.show(myWindow, 'hello_world.html');

// Wait until all windows get closed
await webinix.wait();

console.log("Thank you.");
Deno.exit(0);
