import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Negeri } from '../../negeri/entities/negeri.entity';

@Table({
  tableName: 'kamus',
})
export class Kamus extends Model {
  @ApiProperty({
    description: 'The unique identifier for the dictionary entry',
    example: 1,
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    description: 'The dialect or local word',
    example: 'Hangpa',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dialek: string;

  @ApiProperty({
    description: 'The meaning of the dialect word',
    example: 'Kamu semua',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  maksud: string;

  @ApiProperty({
    description: 'Example sentence using the dialect word',
    example: 'Hangpa nak pergi mana?',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  contoh_ayat: string;

  @ApiProperty({
    description: 'The ID of the state this dialect belongs to',
    example: 1,
  })
  @ForeignKey(() => Negeri)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  negeri_id: number;

  @BelongsTo(() => Negeri)
  negeri: Negeri;
}
