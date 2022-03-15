import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { FsListComponent, FsListConfig } from '@firestitch/list';
import { ItemType } from '@firestitch/filter';
import { FsCountry } from '@firestitch/country';

import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ITrustedDevice } from '../../interfaces/trusted-device';


@Component({
  selector: 'fs-trusted-devices',
  templateUrl: './trusted-devices.component.html',
  styleUrls: [ './trusted-devices.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsTrustedDevicesComponent implements OnInit, OnDestroy {

  @Input()
  public fetchTrustedDevices = (query: any) => new Observable<{
    data: ITrustedDevice[];
    paging?: any;
  }>();

  @Input()
  public deleteTrustedDevice = (trustedDevice: ITrustedDevice) => new Observable<any>();

  @Input()
  public signOutTrustedDevice = (trustedDevice:  ITrustedDevice) => new Observable<any>();

  @Input()
  public showAccount = true;

  @ViewChild(FsListComponent)
  public listComponent: FsListComponent;

  public listConfig: FsListConfig;

  private _destroy$ = new Subject();

  constructor(
    private _fsCountry: FsCountry,
  ) { }

  public ngOnInit(): void {
    this._fsCountry.ready$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._initListConfig();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _initListConfig(): void {
    this.listConfig = {
      rowActions: [
        {
          click: (data) => {
            this.signOutTrustedDevice(data)
            .subscribe(() => {
              this.reload();
            });
          },
          menu: true,
          label: 'Sign Out',
        },
        {
          click: (data) => {
            this.deleteTrustedDevice(data)
            .subscribe(() => {
              this.reload();
            });
          },
          remove: {
            title: 'Confirm',
            template: 'Are you sure you would like to delete this trusted device?',
          },
          menu: true,
          label: 'Delete',
        },
      ],
      fetch: (query) => {
        return this.fetchTrustedDevices(query)
          .pipe(
            map((response) => {
              return {
                data: response.data,
                paging: response.paging,
              };
            }),
          );
      },
    };
  }

  public reload(): void {
    this.listComponent.reload();
  }

}
