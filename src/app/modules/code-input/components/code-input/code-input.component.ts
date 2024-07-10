import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { FsCodeInputComponent } from '@firestitch/code-input';


@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeInputComponent implements OnInit {

  @ViewChild(FsCodeInputComponent)
  public codeInput: FsCodeInputComponent;

  @Input() public codeLength: number;
  @Input() public code;

  @Output() public codeCompleted = new EventEmitter();
  @Output() public codeChanged = new EventEmitter();

  public ngOnInit(): void {
    if(!this.codeLength) {
      this.codeLength = 6;
    }
  } 

  public codeComplete(code): void {
    this.codeCompleted.emit(code);
  }

  public focus(): void {
    this.codeInput.focusOnField(0);
  }
}
