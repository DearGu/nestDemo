import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100, nullable: true })
  nickname: string; // 昵称

  @Exclude()
  @Column()
  password: string; // 密码

  @Column({ nullable: true })
  avatar: string; // 头像

  @Column({ nullable: true })
  email: string;

  @Column('simple-enum', {
    enum: ['root', 'author', 'visitor'],
    default: 'visitor',
  })
  role: string; // 用户角色

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    if (!this.password) return;

    this.password = await bcrypt.hashSync(this.password);
  }
}
