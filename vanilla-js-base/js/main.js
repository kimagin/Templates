"use strict";
import { delay, log, select, event } from "./utils";

// Setup before DOM loads
const initApp = async () => {
  //Dom Elements
  const mainElement = select("section");
  await delay(500);
  mainElement.classList.remove("opacity-0");
  //Event Listeners

  event(mainElement, "transitionend", () =>
    log("⚡ VanillaJS Custom Template is ready...")
  );
};

// document.addEventListener("DOMContentLoaded", initApp);
event(document, "DOMContentLoaded", initApp);

// 🚩 JS Code comes here
