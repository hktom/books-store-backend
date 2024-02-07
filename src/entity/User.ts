import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { TransformerMoney } from "../config/transformMoney";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  orders: Order[];
  points: number;
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

  @Column("money", {
    default: 100,
    transformer: new TransformerMoney(),
  })
  points!: number;

  @OneToMany(() => Order, (order) => order.user, { nullable: true })
  orders!: Order[];
}
