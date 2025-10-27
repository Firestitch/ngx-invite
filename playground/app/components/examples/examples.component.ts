import { Component } from '@angular/core';
import { environment } from '@env';
import { FsExampleModule } from '@firestitch/example';


@Component({
    templateUrl: 'examples.component.html',
    standalone: true,
    imports: [FsExampleModule]
})
export class ExamplesComponent {
  public config = environment;
}
