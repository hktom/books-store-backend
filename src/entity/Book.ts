import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IBook {
  id: string;
  title: string;
  writer: string;
  cover: string;
  point: number;
  tags: tags[];
}

type tags = "fiction" | "non-fiction" | "science" | "essay";

@Entity()
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { length: 255 })
  title!: string;

  @Column("varchar", { length: 255 })
  writer!: string;

  @Column("text")
  cover!: string;

  @Column("money")
  point!: number;

  @Column("varchar", { array: true })
  tags!: tags[];
}
