import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { length: 255 })
  firstName!: string;

  @Column("varchar", { length: 255 })
  lastName!: string;

  @Column("varchar", { length: 255 })
  email!: string;

  @Column("varchar", { length: 255 })
  password!: string;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
}
