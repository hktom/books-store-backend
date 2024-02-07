export class TransformerMoney {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return data ? parseFloat(data.substring(1)) : 0.0;
  }
}
