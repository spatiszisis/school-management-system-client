export interface ResponseEntity {
    readonly timeStamp: string;
    readonly statusCode: number;
    readonly reason: string;
    readonly message: string;
    readonly developerMessage: string;
    readonly data: Map<any, any>;
}