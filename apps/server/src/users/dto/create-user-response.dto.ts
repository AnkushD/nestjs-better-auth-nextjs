export class CreateUserSuccessDto {
  name: string;
  email: string;
  id: number;
}

export class CreateUserErrorDto {
  success: false;
  error: string;
}

export type CreateUserResponseDto = CreateUserErrorDto | CreateUserSuccessDto;
