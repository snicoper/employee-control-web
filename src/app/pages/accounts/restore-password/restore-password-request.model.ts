export interface RestorePasswordRequest {
  userId: string;
  code: string;
  password: string;
  confirmPassword: string;
}
