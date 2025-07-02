import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateKamusDto } from './dto/create-kamus.dto';
import { UpdateKamusDto } from './dto/update-kamus.dto';
import { Kamus } from './entities/kamus.entity';
import { Negeri } from '../negeri/entities/negeri.entity';

@Injectable()
export class KamusService {
  constructor(
    @Inject('KAMUS_REPOSITORY')
    private kamusRepository: typeof Kamus,
    @Inject('NEGERI_REPOSITORY')
    private negeriRepository: typeof Negeri,
  ) {}

  async create(createKamusDto: CreateKamusDto): Promise<Kamus> {
    // Check if negeri exists
    const negeri = await this.negeriRepository.findByPk(createKamusDto.negeri_id);
    if (!negeri) {
      throw new NotFoundException(`Negeri with ID ${createKamusDto.negeri_id} not found`);
    }
    
    return this.kamusRepository.create({ ...createKamusDto });
  }

  async findAll(): Promise<Kamus[]> {
    return this.kamusRepository.findAll({
      include: [{ model: Negeri, attributes: ['id', 'name'] }],
    });
  }

  async findOne(id: number): Promise<Kamus> {
    const kamus = await this.kamusRepository.findByPk(id, {
      include: [{ model: Negeri, attributes: ['id', 'name'] }],
    });
    
    if (!kamus) {
      throw new NotFoundException(`Kamus entry with ID ${id} not found`);
    }
    
    return kamus;
  }

  async update(id: number, updateKamusDto: UpdateKamusDto): Promise<Kamus> {
    const kamus = await this.findOne(id);
    
    // If negeri_id is being updated, check if the new negeri exists
    if (updateKamusDto.negeri_id) {
      const negeri = await this.negeriRepository.findByPk(updateKamusDto.negeri_id);
      if (!negeri) {
        throw new NotFoundException(`Negeri with ID ${updateKamusDto.negeri_id} not found`);
      }
    }
    
    await kamus.update(updateKamusDto);
    return kamus.reload({
      include: [{ model: Negeri, attributes: ['id', 'name'] }],
    });
  }

  async remove(id: number): Promise<void> {
    const kamus = await this.findOne(id);
    await kamus.destroy();
  }

  async findByDialek(dialek: string): Promise<Kamus[]> {
    return this.kamusRepository.findAll({
      where: {
        dialek: {
          [Symbol.for('like')]: `%${dialek}%`,
        },
      },
      include: [{ model: Negeri, attributes: ['id', 'name'] }],
    });
  }

  async findByNegeriId(negeriId: number): Promise<Kamus[]> {
    // Check if negeri exists
    const negeri = await this.negeriRepository.findByPk(negeriId);
    if (!negeri) {
      throw new NotFoundException(`Negeri with ID ${negeriId} not found`);
    }
    
    return this.kamusRepository.findAll({
      where: {
        negeri_id: negeriId,
      },
      include: [{ model: Negeri, attributes: ['id', 'name'] }],
    });
  }
}
