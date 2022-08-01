export interface Repository<T, C, U> {
  create(dto: C): Promise<T>;
  findByID(id: string): Promise<T | undefined>;
  findAll(
    limit: number,
    offset: number,
    loginSubstring: string | undefined,
  ): Promise<T[]>;
  update(id: string, dto: U): Promise<T>;
  remove(id: string): Promise<void | null>;
}
