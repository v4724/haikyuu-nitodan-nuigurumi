import { FilterService } from './core/services/filter.service';
import { Component, OnInit } from '@angular/core';
import { SeriesInfoVO } from './core/view-models/SeriesInfoVO';
import { seriesList, goodsList, characterList, schoolList } from './data/DB';
import { GoodsInfoVO } from './core/view-models/GoodsInfoVO';
import { cloneDeep } from 'lodash';
import { Observable, map } from 'rxjs';
import html2canvas from 'html2canvas';
import { TranslateService } from '@ngx-translate/core';
import { ListItem } from './core/view-models/common.model';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'haikyuu-nitodan-nuigurumi';
  currLang = 'zh-TW';
  downloadLoading = false;

  constructor(
    public service: FilterService,
    public languageService: LanguageService,
    private translateService: TranslateService
  ) {
    this.translateService.use(this.currLang);
  }

  ngOnInit() {
    console.log();
  }

  get $filteredCheckedCount(): Observable<number> {
    return this.service.$filteredItems.pipe(
      map(items => {
        return items.reduce(
          (acc, curr) =>
            acc + curr.goodsList.filter(goods => goods.checked).length,
          0
        );
      })
    );
  }
  get $filteredCount(): Observable<number> {
    return this.service.$filteredItems.pipe(
      map(items => {
        return items.reduce((acc, curr) => acc + curr.goodsList.length, 0);
      })
    );
  }

  changeLang() {
    this.translateService.use(this.currLang);
  }

  click() {
    if (this.downloadLoading) return;

    this.downloadLoading = true;
    const element: HTMLElement | null = document.querySelector('#capture');
    if (element) {
      html2canvas(element, {
        ignoreElements: (element: Element) => {
          return (
            element.id === 'filter' ||
            element.id === 'export-btn' ||
            element.id === 'translate-dropdown'
          );
        },
      }).then(canvas => {
        const a = document.createElement('a');
        a.href = canvas
          .toDataURL('image/jpeg', 0.92)
          .replace('image/jpeg', 'image/octet-stream');
        a.download = 'image.jpg';
        a.click();

        this.downloadLoading = false;
      });
    }
  }
}
