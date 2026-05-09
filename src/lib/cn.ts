import { twMerge } from "tailwind-merge"

type CnArg = string | undefined | null | boolean | CnArg[]

const collectStrings = (arg: CnArg, out: string[]): void => {
  if (arg === null || arg === undefined || arg === false || arg === true) {
    return
  }
  if (typeof arg === "string") {
    out.push(arg)
    return
  }
  for (const item of arg) {
    collectStrings(item, out)
  }
}

export const cn = (...inputs: CnArg[]): string => {
  const classes: string[] = []
  for (const input of inputs) {
    collectStrings(input, classes)
  }
  return twMerge(...classes)
}
