export interface MapperInterface<TInput, TPersistence, TResponse> {
  toPersistence(input: TInput): TPersistence;
  toResponse(input: TPersistence): TResponse;
}
