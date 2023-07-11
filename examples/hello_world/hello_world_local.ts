// Same as hello_world.ts but using a local file

import { Webinix } from "../../mod.ts";
import { fromFileUrl } from "https://deno.land/std@0.192.0/path/mod.ts";

async function calculate({ window }: Webinix.Event) {
  // Call a js function
  const getA = await window.script("return get_A()").catch((error) => {
    console.error(`Error in the JavaScript: ${error}`);
    return "";
  });

  const getB = await window.script("return get_B()").catch((error) => {
    console.error(`Error in the JavaScript: ${error}`);
    return "";
  });

  // Calculate
  const result = parseInt(getA) + parseInt(getB);

  // Run js (Quick Way)
  window.run(`set_result(${result});`);
}

// Create new window
const myWindow = new Webinix();

// Bind
myWindow.bind("Calculate", calculate);
myWindow.bind("Exit", () => Webinix.exit()); // Close all windows and exit

//Get the HTML file for example
const url = import.meta.resolve("./hello_world.html");
try {
  //If example run from local copy
  const path = fromFileUrl(url);

  myWindow.show(path); // Or myWindow.show('./hello_world.html');
} catch {
  //If example run from remote url
  const response = await fetch(url);
  const html = await response.text();

  console.error("Can't load remote file, switch to fetching remote file");
  myWindow.show(html);
}

// Show the window

// Wait until all windows get closed
await Webinix.wait();
console.log("Thank you.");
