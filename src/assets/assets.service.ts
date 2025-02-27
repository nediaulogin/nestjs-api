import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Model } from 'mongoose';
import { Asset } from './entities/asset.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetSchema: Model<Asset>) {}

  findAll() {
    return this.assetSchema.find();
  }

  findOne(symbol: string) {
    const ativo = this.assetSchema.findOne({
      symbol,
    });

    if (ativo === null) {
      throw new Error('Ativo não encontrado');
    }

    return ativo;
  }

  create(createAssetDto: CreateAssetDto) {
    return this.assetSchema.create(createAssetDto);
  }

  /*   remove(id: number) {
      return `This action removes a #${id} asset`;
    } */
  /*   update(id: number, updateAssetDto: UpdateAssetDto) {
      return `This action updates a #${id} asset`;
    } */
}
