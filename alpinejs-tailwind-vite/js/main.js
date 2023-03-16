"use strict";

//Imports
import { delay, log, select, event } from "./utils";
import Alpine from "alpinejs";
import Data from "./modules/data";
import { Counter } from "./modules/counter";

// 🗻 Alpine modules
window.Alpine = Alpine;
Alpine.data("data", Data);
Alpine.data("counter", Counter);
Alpine.start();

// Setup before DOM loads
const initApp = async () => {
  //Dom Elements
  const mainElement = select(".main");
  await delay(1000);
  mainElement.classList.remove("opacity-0");

  //Event Listeners
  event(mainElement, "transitionend", () =>
    log("⚡ AlpineJS Custom Template is ready...")
  );
};

event(document, "DOMContentLoaded", initApp);

// 🚩 JS Code comes here
