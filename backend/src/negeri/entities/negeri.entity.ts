import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Kamus } from '../../kamus/entities/kamus.entity';

@Table({
  tableName: 'negeri',
})
export class Negeri extends Model {
  @ApiProperty({
    description: 'The unique identifier for the state',
    example: 1,
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the Malaysian state',
    example: 'Selangor',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => Kamus)
  kamus: Kamus[];
}
