import { PartialType } from '@nestjs/swagger/dist';
import { CreateKamusDto } from './create-kamus.dto';

export class UpdateKamusDto extends PartialType(CreateKamusDto) {}
