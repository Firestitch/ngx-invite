import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';


@Component({
  selector: 'app-defaulted',
  templateUrl: './defaulted.component.html',
  styleUrls: ['./defaulted.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultedComponent {

}
