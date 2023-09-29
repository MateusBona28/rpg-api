import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity('character')
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined

  @Column({ type: 'varchar', nullable: true })
  name: string | undefined

  @Column({ type: 'integer' })
  san: number | undefined

  @Column({ type: 'integer' })
  pv: number | undefined

  @Column({ type: 'integer' })
  pe: number | undefined

  @Column({ type: 'text', nullable: true })
  portrait_image: string | undefined

  @Column({ type: 'text', nullable: true  })
  token_image: string | undefined

  @ManyToOne(() => User, user => user.characters)
  user: User | undefined

}