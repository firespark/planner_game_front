export function handleError(_response: Response, data: any, defaultMessage: string): never {
  const message = data?.error || defaultMessage;
  throw new Error(message);
}