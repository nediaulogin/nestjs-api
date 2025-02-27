import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalletAsset } from './entities/wallet-asset.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletSchema: Model<Wallet>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
  ) {}

  findAll() {
    return this.walletSchema.find();
  }

  findOne(id: string) {
    this.walletAssetSchema.find({ wallet: id }).populate(['wallet', 'asset']);
    const ativo = this.walletSchema.findById(id);

    if (ativo === null) {
      throw new Error('Ativo não encontrado');
    }

    return ativo;
  }

  create(createWalletDto: CreateWalletDto) {
    return this.walletSchema.create(createWalletDto);
  }

  async createWalletAsset(data: {
    walletId: string;
    assetId: string;
    shares: number;
  }) {
    const walletAsset = await this.walletAssetSchema.create({
      wallet: data.walletId,
      asset: data.assetId,
      shares: data.shares,
    });
    this.walletSchema.updateOne(
      { _id: data.walletId },
      { $push: { assets: walletAsset._id } },
    );
  }
  /*   update(id: number, updateWalletDto: UpdateWalletDto) {
      return `This action updates a #${id} wallet`;
    } */

  /*   remove(id: number) {
      return `This action removes a #${id} wallet`;
    } */
}
