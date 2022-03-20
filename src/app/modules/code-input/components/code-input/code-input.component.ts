import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, ViewChild } from '@angular/core';

import { CodeInputComponent as AngularCodeInputComponent } from 'angular-code-input';


@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeInputComponent {

  @ViewChild(AngularCodeInputComponent)
  public angularCodeInputComponent: AngularCodeInputComponent;

  @Input() public codeLength: number;
  @Input() public code;

  @Output() public codeCompleted = new EventEmitter();
  @Output() public codeChanged = new EventEmitter();
  
  public focus(): void {
    this.angularCodeInputComponent.focusOnField(0);
  }
}