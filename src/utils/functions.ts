export function isStringModel(model: string | string[]): model is string {
  return typeof model === "string";
}
