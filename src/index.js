import { Controller } from "./controller";
import { Model } from "./model";
import { View } from "./view";

// localStorage.clear();

const app = new Controller({ model: new Model(), view: new View() });
