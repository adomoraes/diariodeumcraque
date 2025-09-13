export class CreateUserDto {
  email: string;
  name?: string;
  password_hash: string;
}