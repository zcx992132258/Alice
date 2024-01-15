import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 8,
    comment: '用户名',
  })
  username: string

  @Column({
    length: 30,
    comment: '邮箱',
  })
  email: string

  @Column({
    length: 30,
    comment: '密码',
  })
  password: string

  @Column({
    comment: '密码盐',
  })
  passwdSalt: string

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date
}
