// Run this script by:
// deno run --allow-all --unstable hello_world.ts
import { Webinix } from "../../mod.ts";

// Optional - Set a custom library path:
//  const libPath = './webinix-2.dll';
//  console.log("Looking for the Webinix dynamic library at: " + libPath);
//  new Webinix({ libPath });

const myHtml = `
<!DOCTYPE html>
<html>
	<head>
    <script src="webinix.js"></script>
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
        <h1>Webinix 2 - Deno Hello World (File)</h1><br>
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

async function calculate(e: Webinix.Event) {
  // Settings if needed
  // timeout = 30 // Set javascript execution timeout
  // bufferSize = 64 // Set the response size in bytes

  // Call a js function
  const getA = await e.window.script("return get_A()").catch((error) => {
    console.error(`Error in the JavaScript: ${error}`);
    return "";
  });

  const getB = await e.window.script("return get_B()").catch((error) => {
    console.error(`Error in the JavaScript: ${error}`);
    return "";
  });

  // Calculate
  const result = parseInt(getA) + parseInt(getB);

  // Run js (Quick Way)
  e.window.run(`set_result(${result});`);
}

// Create new window
const myWindow = new Webinix();

// Bind
myWindow.bind("Calculate", calculate);
myWindow.bind("Exit", () => Webinix.exit()); // Close all windows and exit

// Show the window
myWindow.show(myHtml); // Or myWindow.show('./hello_world.html');

// Wait until all windows get closed
await Webinix.wait();

console.log("Thank you.");
