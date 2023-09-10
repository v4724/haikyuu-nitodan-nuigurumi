import { Goods } from '../DB-models/Goods';
import { Series } from '../DB-models/Series';

export interface GoodsInfoVO extends Goods {
  info: Series;
  checked: boolean;
}
