import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ReplaySubject, take } from 'rxjs';
import { ListItem } from '../view-models/common.model';
import { MenuItem } from 'primeng/api/menuitem';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translateService: TranslateService) {
    this.langs = [
      {
        label: '繁體',
        value: 'zh-TW',
      },
      {
        label: '日文',
        value: 'jp-JP',
      },
    ];
  }
  langs: ListItem<string>[];
  /**
   * ### ReplaySubject - language$
   *
   * @memberof LanguageService
   */
  language$ = new ReplaySubject<LangChangeEvent>(1);

  /**
   * ### langService
   *
   * @type {*}
   * @memberof LanguageService
   */
  langService: any = null;

  /**
   * set i18n language
   *
   * @param {string} [language='']
   * @memberof LanguageService
   */
  setLang(language = '') {
    const lang = language || localStorage.getItem('lang') || navigator.language;
    localStorage.setItem('lang', lang);

    // 觸發 Rxjs
    this.setLangRxjs(lang);
  }

  /**
   * set language RxJS
   *
   * @param {string} [lang='']
   * @memberof LanguageService
   */
  setLangRxjs(lang = '') {
    this.langService = this.translateService.onLangChange
      .pipe(take(1))
      .subscribe(result => {
        this.language$.next(result);
      });

    // 改變使用的語系
    this.translateService.use(lang);
  }
}
