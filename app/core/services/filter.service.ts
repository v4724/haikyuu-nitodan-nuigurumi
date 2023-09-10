import { cloneDeep } from 'lodash';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  skip,
} from 'rxjs';
import { goodsList, seriesList } from './../../data/DB';
import { Injectable } from '@angular/core';
import { SeriesInfoVO } from '../view-models/SeriesInfoVO';
import { GoodsInfoVO } from '../view-models/GoodsInfoVO';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  selectedSeriesChange = new BehaviorSubject<string[]>([]);
  selectedCharactersChange = new BehaviorSubject<string[]>([]);

  items!: SeriesInfoVO[];
  filteredItems = new BehaviorSubject<SeriesInfoVO[]>([]);

  $filteredItems!: Observable<SeriesInfoVO[]>;

  constructor() {
    this.$filteredItems = this.filteredItems.asObservable();

    this.items = [];

    seriesList.forEach(series => {
      const data: SeriesInfoVO = { info: series, goodsList: [] };
      const sId = series.id;
      data.goodsList = goodsList
        .filter(goods => {
          return goods.sId === sId;
        })
        .map(goods => {
          return { ...goods, checked: false } as GoodsInfoVO;
        });
      this.items.push(data);
    });

    combineLatest({
      selectedSeries: this.selectedSeriesChange,
      selectedCharacter: this.selectedCharactersChange,
    }).subscribe(({ selectedSeries, selectedCharacter }) => {
      this.filteredItemsChange(selectedSeries, selectedCharacter);
    });
  }

  filteredItemsChange(
    selectedSeries: string[],
    selectedCharacters: string[]
  ): void {
    let filtered: SeriesInfoVO[] = cloneDeep(this.items);
    if (selectedSeries && selectedSeries.length) {
      filtered = filtered.filter(series => {
        return selectedSeries.find(selected => selected === series.info.id);
      });
    }
    filtered.forEach(series => {
      const origSeries: SeriesInfoVO | undefined = this.items.find(
        item => item.info.id === series.info.id
      );

      if (origSeries) {
        series.goodsList = origSeries.goodsList.filter(goods => {
          if (selectedCharacters && selectedCharacters.length)
            return selectedCharacters.find(selected => selected === goods.cId);
          return true;
        });
      }
    });

    this.filteredItems.next(filtered);
  }
}
