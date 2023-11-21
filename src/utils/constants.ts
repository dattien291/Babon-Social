import { floor, random, noop } from "lodash";

export const isServer = () => typeof window === "undefined";

export const $ = !isServer() ? document.querySelector.bind(document) : noop;
export const $$ = !isServer() ? document.querySelectorAll.bind(document) : noop;

export const defaultImages = {
  ERROR: "/images/error.png",
};

export const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
} as const;

export const RANDOM = floor(random(1, 5));

export const COLORS = [
  "#000000",
  "#ffffff",
  "#f83d3d",
  "#2986ae",
  "#5ed5ff",
  "#f8e24c",
  "#f9cbd1",
  "#fb3ea0",
  "#941fb1",
  "#b9fccb",
  "#583b9a",
  "#caedf8",
  "#702929",
];
