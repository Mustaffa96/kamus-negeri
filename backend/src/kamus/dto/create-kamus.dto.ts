import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsInt } from 'class-validator';

export class CreateKamusDto {
  @ApiProperty({
    description: 'The dialect or local word',
    example: 'Hangpa',
  })
  @IsNotEmpty()
  @IsString()
  dialek: string;

  @ApiProperty({
    description: 'The meaning of the dialect word',
    example: 'Kamu semua',
  })
  @IsNotEmpty()
  @IsString()
  maksud: string;

  @ApiProperty({
    description: 'Example sentence using the dialect word',
    example: 'Hangpa nak pergi mana?',
    required: false,
  })
  @IsOptional()
  @IsString()
  contoh_ayat?: string;

  @ApiProperty({
    description: 'The ID of the state this dialect belongs to',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  negeri_id: number;
}
