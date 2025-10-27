import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';


@Component({
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        RouterOutlet,
    ],
})
export class SigninComponent {

}
