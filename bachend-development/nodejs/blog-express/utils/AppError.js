class AppError extends Error {
  constructor(message, statusCode, errors) {
    super(message);
    this.statusCode = statusCode || 500;
    this.errors = errors || [];
    console.log(statusCode);
  }
}

module.exports = AppError;
