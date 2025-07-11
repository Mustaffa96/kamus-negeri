import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNegeriDto {
  @ApiProperty({
    description: 'The name of the Malaysian state',
    example: 'Selangor',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
