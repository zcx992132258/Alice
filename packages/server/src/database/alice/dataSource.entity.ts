import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class DataSource {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 10000, comment: '数据库名称' })
  database: string

  @Column({
    comment: '主机地址',
    length: 255,
  })
  host: string

  @Column({
    comment: '端口号',
    length: 10,
  })
  port: string

  @Column({
    comment: '用户名',
    length: 255,
  })
  username: string

  @Column({
    comment: '别名',
    length: 255,
  })
  aliasName: string

  @Column({
    comment: '密码',
    length: 255,
  })
  password: string

  @Column({
    comment: '表名',
    length: 255,
  })
  tableName: string

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date

  @ManyToOne(() => User, user => user)
  createdUser: Promise<User>
}
