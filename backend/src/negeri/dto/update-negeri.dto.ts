import { PartialType } from '@nestjs/swagger/dist';
import { CreateNegeriDto } from './create-negeri.dto';

export class UpdateNegeriDto extends PartialType(CreateNegeriDto) {}
