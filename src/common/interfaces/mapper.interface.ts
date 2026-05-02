export interface MapperInterface<
  TInput,
  TPersistenceOutput,
  TResponseInput,
  TResponseOutput,
> {
  toPersistence(input: TInput): TPersistenceOutput;
  toResponse(input: TResponseInput): TResponseOutput;
}
