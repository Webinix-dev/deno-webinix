import { Webinix } from "../mod.ts";
import { loadLib } from "./lib.ts";

export type Usize = number | bigint;

export type BindCallback<
  T extends JSONValue | undefined | void,
> = (
  event: WebinixEvent,
) => T | Promise<T>;

export interface WebinixEvent {
  window: Webinix;
  eventType: number;
  element: string;
  data: string;
  size: number;
}

export type WebinixLib = Awaited<ReturnType<typeof loadLib>>;

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue | undefined }
  | JSONValue[];
