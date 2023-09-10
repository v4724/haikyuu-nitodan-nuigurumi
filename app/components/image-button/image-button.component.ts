import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GoodsInfoVO } from 'src/app/core/view-models/GoodsInfoVO';

@Component({
  selector: 'app-image-button',
  templateUrl: './image-button.component.html',
  styleUrls: ['./image-button.component.scss'],
})
export class ImageButtonComponent {
  @Input() data!: GoodsInfoVO;

  click() {
    this.data.checked = !this.data.checked;
  }
}
