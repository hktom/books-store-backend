import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  orders: Order[];
}

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

  @OneToMany(() => Order, (order) => order.user, { nullable: true })
  orders!: Order[];
}
