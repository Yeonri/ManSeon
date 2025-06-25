export function handleError(e: unknown) {
  if (e instanceof Error) throw new Error(e.message);
  else throw new Error("unknown Error");
}
