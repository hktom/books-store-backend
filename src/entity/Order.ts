import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Cart } from "./Cart";

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
