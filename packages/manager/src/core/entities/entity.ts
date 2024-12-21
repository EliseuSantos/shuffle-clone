
export abstract class Entity<Data> {
  protected data: Data

  protected constructor(data: Data) {
    this.data = data
  }
}
