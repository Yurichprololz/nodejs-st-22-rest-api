import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @Matches(/\d.+?[a-z]|[a-z].+?\d/i, {
    message: 'The password must contains number and figure',
  })
  readonly password: string;

  @IsNumber()
  @Min(4)
  @Max(130)
  readonly age: number;
}
