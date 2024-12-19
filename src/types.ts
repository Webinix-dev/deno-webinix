import { Webinix } from "../mod.ts";
import { loadLib } from "./lib.ts";

export type Usize = number | bigint;

export type BindCallback<
  T extends Datatypes | undefined | void,
> = (event: WebinixEvent) => T | Promise<T>;

export interface WebinixEvent {
  window: Webinix;
  eventType: number;
  eventNumber: number;
  element: string;
  arg: {
    number: (index: number) => number;
    string: (index: number) => string;
    boolean: (index: number) => boolean;
  };
}

export type WebinixLib = Awaited<ReturnType<typeof loadLib>>;

export type Datatypes =
  | string
  | number
  | boolean
