import { PartialType } from '@nestjs/swagger';
import { CreateNegeriDto } from './create-negeri.dto';

export class UpdateNegeriDto extends PartialType(CreateNegeriDto) {}
