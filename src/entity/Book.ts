import { Column, Entity } from "typeorm";

type tags = "fiction" | "non-fiction" | "science" | "essay";

@Entity()
export class Book {
  @Column({ primary: true, generated: "uuid" })
  id: string | undefined;

  @Column("varchar", { length: 255 })
  title: string | undefined;

  @Column("varchar", { length: 255 })
  writer: string | undefined;

  @Column("text")
  cover: string | undefined;

  @Column("money")
  point: number | undefined;

  @Column("varchar", { array: true })
  tags: tags[] | undefined;
}
