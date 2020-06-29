import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export default class User {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  avatar: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
