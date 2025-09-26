class CustomError extends Error {
  public statusCode: number; // Explicitly declare statusCode

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export { CustomError };
