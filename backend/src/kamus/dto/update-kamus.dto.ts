import { PartialType } from '@nestjs/swagger';
import { CreateKamusDto } from './create-kamus.dto';

export class UpdateKamusDto extends PartialType(CreateKamusDto) {}
