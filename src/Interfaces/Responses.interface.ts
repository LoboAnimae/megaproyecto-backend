export interface IBaseResponse {
    success: boolean;
    statusCode: number;
}

export interface ISuccessResponse<T> extends IBaseResponse {
    payload: T;
}

export interface IErrorResponse extends IBaseResponse {
    error: string;
}