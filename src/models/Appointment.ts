import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm'

import User from './User'

@Entity('appointments')
export default class Appointment {
  @PrimaryColumn('uuid')
  id: string
  @Column()
  provider_id: string

  @ManyToMany(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User

  @Column('timestamp with time zone')
  date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
