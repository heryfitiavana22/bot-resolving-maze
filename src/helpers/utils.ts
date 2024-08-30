import { SLEEP_TIME_MS } from "../constants";

export async function sleep(time = SLEEP_TIME_MS) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
