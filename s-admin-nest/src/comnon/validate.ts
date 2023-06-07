import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "@nestjs/common/interfaces/external/validation-error.interface";

export default class Validate extends ValidationPipe {
  protected flattenValidationErrors = (validationErrors: ValidationError[]): string[] => {
    super.flattenValidationErrors(validationErrors)
    console.log(validationErrors)
    const messages = {};
    validationErrors.map(error => {
      console.log(Object.values(error.constraints));
      messages[error.property] = Object.values(error.constraints)[0]
    })
    console.log(messages);
    throw new HttpException(
      {
        code: 422,
        data: messages
      },
      HttpStatus.UNPROCESSABLE_ENTITY
    )
  };
}