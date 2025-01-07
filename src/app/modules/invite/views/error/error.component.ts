import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatButtonModule,
  ],
})
export class ErrorComponent {
}
