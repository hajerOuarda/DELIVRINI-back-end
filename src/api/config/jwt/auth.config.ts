import * as fs from "fs";

export const PUBLIC_KEY = fs.readFileSync("./public.key");
export const PRIVATE_KEY = fs.readFileSync("./private.key");
