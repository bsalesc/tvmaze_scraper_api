export class InvalidParamException extends Error {
  public constructor(...args: string[]) {
    super(...args);
  }
}
