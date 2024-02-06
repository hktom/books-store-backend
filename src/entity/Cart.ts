import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";
import { Order } from "./Order";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("int")
  quantity!: number;

  @Column("money")
  total!: number;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn({ name: "book_id" })
  book!: Book;

  @ManyToOne(() => Order, (order) => order.carts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id", referencedColumnName: "id" })
  order!: Order;
}
