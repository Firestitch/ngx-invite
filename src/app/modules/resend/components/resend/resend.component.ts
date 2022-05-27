import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-resend',
  templateUrl: './resend.component.html',
  styleUrls: ['./resend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResendComponent {

  @Input() public resend: () => Observable<any>;
  
  public resendInProgress = false;

  private _destroy$ = new Subject();
  
  constructor(
    private _cdRef: ChangeDetectorRef,
  ) {}

  public resendClick(): void {
    this.resendInProgress = true;
    this.resend()
      .pipe(
        finalize(() => {
          this.resendInProgress = false;  
          this._cdRef.markForCheck();  
        }),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }


}