export enum StatusEnum {
  INACTIVE = 0,
  ACTIVE = 1,
}

enum SuccessStatus {
  SUCCESS = 200,
}

export type CommonResponse = {
  statusCode: SuccessStatus,
  message: string;
};
