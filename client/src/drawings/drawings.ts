import { complex } from "./complex";
import { originalExample } from "./originalExample";

export const drawings :  { [key: string]: () => void } = {
    "": () => {alert("Please select a drawing from the dropdown menu.")},
    'example': originalExample,
    'complex': complex,
  };