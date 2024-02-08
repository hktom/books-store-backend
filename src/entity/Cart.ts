import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";
import { Order } from "./Order";
import { TransformerMoney } from "../config/transformMoney";

export interface ICart {
  id: string;
  quantity: number;
  unitPrice: number;
  total: number;
  bookId: string;
  bookCover: string;
  bookTitle: string;
  book: Book;
  order: Order;
}

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("int")
  quantity!: number;

  @Column("varchar")
  bookId!: string;

  @Column("text")
  bookCover!: string;

  @Column("varchar")
  bookTitle!: string;

  @Column("money", {
    nullable: true,
    transformer: new TransformerMoney(),
  })
  unitPrice!: number;

  @Column("money", {
    transformer: new TransformerMoney(),
  })
  total!: number;

  @ManyToOne(() => Order, (order) => order.carts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id", referencedColumnName: "id" })
  order!: Order;
}
