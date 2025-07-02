import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateNegeriDto } from './dto/create-negeri.dto';
import { UpdateNegeriDto } from './dto/update-negeri.dto';
import { Negeri } from './entities/negeri.entity';

@Injectable()
export class NegeriService {
  constructor(
    @Inject('NEGERI_REPOSITORY')
    private negeriRepository: typeof Negeri,
  ) {}

  async create(createNegeriDto: CreateNegeriDto): Promise<Negeri> {
    return this.negeriRepository.create({ ...createNegeriDto });
  }

  async findAll(): Promise<Negeri[]> {
    return this.negeriRepository.findAll();
  }

  async findOne(id: number): Promise<Negeri> {
    const negeri = await this.negeriRepository.findByPk(id);
    
    if (!negeri) {
      throw new NotFoundException(`Negeri with ID ${id} not found`);
    }
    
    return negeri;
  }

  async update(id: number, updateNegeriDto: UpdateNegeriDto): Promise<Negeri> {
    const negeri = await this.findOne(id);
    
    await negeri.update(updateNegeriDto);
    return negeri.reload();
  }

  async remove(id: number): Promise<void> {
    const negeri = await this.findOne(id);
    await negeri.destroy();
  }

  async findByName(name: string): Promise<Negeri[]> {
    return this.negeriRepository.findAll({
      where: {
        name: {
          [Symbol.for('like')]: `%${name}%`,
        },
      },
    });
  }
}
