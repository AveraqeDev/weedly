export enum Status {
  ERROR = "Error",
  SUCCESS = "Success",
  INTERNAL_ERROR = "Internal Server Error",
}

export type ErrorData = {
  message: string;
};

export type JsonResponse<T = ErrorData> = {
  status: Status;
  data: T | ErrorData;
};

export const isErrorResponse = (
  status: string,
  data?: any
): data is ErrorData => {
  return status !== Status.SUCCESS;
};
