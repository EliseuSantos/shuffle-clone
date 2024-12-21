export abstract class ValueObject<Data> {
  protected data: Data

  protected constructor(data: Data) {
    this.data = data
  }
}
