import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, ValidationPipe } from '@nestjs/common';

@Injectable()
export class LoggingValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        console.error('Validation Errors:', JSON.stringify(errors, null, 2)); // Log errors
        return new BadRequestException(errors);
      },
    });
  }
}
