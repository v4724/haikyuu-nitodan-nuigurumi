import { Series } from '../DB-models/Series';
import { GoodsInfoVO } from './GoodsInfoVO';

export interface SeriesInfoVO {
  info: Series;
  goodsList: GoodsInfoVO[];
}
