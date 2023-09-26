import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined

  @Column({ type: 'varchar', length: 50 })
  username: string | undefined

  @Column({ type: 'varchar', length: 90 })
  password: string | undefined

  @Column({type: 'boolean'})
  isAdmin: boolean | undefined
};