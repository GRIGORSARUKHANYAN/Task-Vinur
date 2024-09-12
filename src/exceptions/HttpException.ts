class HttpException extends Error {
  public status: number;
  public message: string;
  public includeStackTrace: boolean;

  constructor(status: number, message: string, includeStackTrace = false) {
    super(message);
    this.status = status;
    this.message = message;
    this.includeStackTrace = includeStackTrace;
  }
}

export default HttpException;
