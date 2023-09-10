import { Component, OnInit } from '@angular/core';
import { ListItem } from 'src/app/core/view-models/common.model';
import { SelectItemGroup } from 'primeng/api';
import { GoodsInfoVO } from 'src/app/core/view-models/GoodsInfoVO';
import { SeriesInfoVO } from 'src/app/core/view-models/SeriesInfoVO';
import {
  seriesList,
  goodsList,
  schoolList,
  characterList,
} from 'src/app/data/DB';
import { FilterService } from 'src/app/core/services/filter.service';
import { MultiSelectChangeEvent } from 'primeng/multiselect';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  seriesList!: ListItem<string>[];
  groupedCharacters!: SelectItemGroup[];

  selectedSeries!: string[];
  selectedCharacters!: string[];

  constructor(private filterService: FilterService) {}
  ngOnInit() {
    this.groupedCharacters = [];
    this.seriesList = [];

    schoolList.forEach(school => {
      const characters: ListItem<string>[] = characterList
        .filter(c => c.sId === school.id)
        .map(c => {
          return {
            label: c.name,
            value: c.id,
          };
        });
      this.groupedCharacters.push({
        label: school.name,
        value: school.id,
        items: characters,
      });
    });
    seriesList.forEach(series => {
      this.seriesList.push({
        label: series.name,
        value: series.id,
      });
    });
  }

  selectedSeriesChange(event: MultiSelectChangeEvent) {
    this.filterService.selectedSeriesChange.next(event.value);
  }

  selectedCharactersChange(event: MultiSelectChangeEvent) {
    this.filterService.selectedCharactersChange.next(event.value);
  }

  selectedSeriesClear() {
    this.filterService.selectedSeriesChange.next([]);
  }

  selectedCharactersClear() {
    this.filterService.selectedCharactersChange.next([]);
  }
}
