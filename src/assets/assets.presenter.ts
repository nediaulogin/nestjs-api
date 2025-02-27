import { Asset } from "./entities/asset.entity";

export class AssetsPresenter {
  constructor(private asset: Asset) {}

  toJSON() {
    return {
      id: this.asset._id,
      name: this.asset.name,
      symbol: this.asset.symbol,
      price: this.asset.price,
      image_url: `http://localhost:9000/${this.asset.image}`,
    };
  }}