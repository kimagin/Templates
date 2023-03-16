"use strict";

//Imports
import { delay, log, select, event } from "./utils";

// Setup before DOM loads
const initApp = async () => {
  //Dom Elements
  const mainElement = select("section");
  await delay(1000);
  mainElement.classList.remove("opacity-0");
  //Event Listeners
  event(mainElement, "transitionend", () =>
    log("⚡ TailwindCSS Template is ready...")
  );
};

document.addEventListener("DOMContentLoaded", initApp);

// 🚩 Client-side JS Code comes here
