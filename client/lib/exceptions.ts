export class UploadFileError extends Error {
    constructor(message = "Error uploading file, please try again") {
      super(message);
      this.name = "UploadFileError";
    }
  }