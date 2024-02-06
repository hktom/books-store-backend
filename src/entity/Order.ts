import { Column, Entity } from "typeorm";

@Entity()
export class Order {
  @Column({ primary: true, generated: "uuid" })
  id: string | undefined;
}