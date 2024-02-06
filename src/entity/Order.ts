import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { User } from "./user";

export interface IOrder {
  id: string;
  total: number;
  status: string;
  carts: Cart[];
  user: User;
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("money")
  total!: number;

  @Column("varchar", { length: 255 })
  status!: string;

  @OneToMany(() => Cart, (cart) => cart.order)
  carts!: Cart[];

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user: User | undefined;
}
