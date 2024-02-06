import { Column, Entity } from "typeorm";

@Entity()
export class User {
  @Column({ primary: true, generated: "uuid" })
  id: string | undefined;

  @Column("varchar", { length: 255 })
  firstName: string | undefined;

  @Column("varchar", { length: 255 })
  lastName: string | undefined;

  @Column("varchar", { length: 255 })
  email: string | undefined;

  @Column("varchar", { length: 255 })
  password: string | undefined;
}
