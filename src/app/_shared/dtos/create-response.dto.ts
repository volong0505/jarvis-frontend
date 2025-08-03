export class CreateResponseDto<T> {
  success!: boolean;
  message!: string;
  data!: T;
  timestamp!: string;
}