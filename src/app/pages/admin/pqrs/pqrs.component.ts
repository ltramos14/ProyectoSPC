import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReplyPqrComponent } from './reply-pqr/reply-pqr.component';
import { PqrMailbox } from 'src/app/models/pqr.model';
import { PqrsService } from 'src/app/service/users/pqrs.service';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';

import icAnswer from '@iconify/icons-ic/twotone-message';
import icCheck from '@iconify/icons-ic/twotone-check';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icNot from '@iconify/icons-ic/twotone-close';
import icReply from '@iconify/icons-ic/twotone-question-answer';
import icSearch from '@iconify/icons-ic/twotone-search';
import icWithoutAnswer from '@iconify/icons-ic/twotone-announcement';

@UntilDestroy()
@Component({
  selector: 'spc-pqrs',
  templateUrl: './pqrs.component.html',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class PqrsComponent implements OnInit, AfterViewInit {

  @Input()
  columns: TableColumn<PqrMailbox>[] = [
    { label: 'Id', property: 'id', type: 'text', visible: true, cssClasses: ['text-center'] },
    { label: 'Id Usuario', property: 'idUser', type: 'text', visible: false, cssClasses: ['font-medium'] },
    { label: 'Fecha', property: 'date', type: 'text', visible: true },
    { label: 'Tipo', property: 'type', type: 'text', visible: true, cssClasses: ['font-bold', 'text-center']},
    { label: 'Descripción', property: 'description', type: 'text', visible: true },
    { label: 'Estado', property: 'answer', type: 'button', visible: true, cssClasses: ['text-center'] },
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  layoutCtrl = new FormControl('boxed');

  subject$: ReplaySubject<PqrMailbox[]> = new ReplaySubject<PqrMailbox[]>(1);

  data$: Observable<PqrMailbox[]> = this.subject$.asObservable();

  requests: PqrMailbox[];

  pageSize = 10;

  pageSizeOptions: number[] = [5, 10, 20, 50];

  dataSource: MatTableDataSource<PqrMailbox> | null;

  selection = new SelectionModel<PqrMailbox>(true, []);

  searchCtrl = new FormControl();

  loading: boolean = false;

  icAnswer = icAnswer;
  icCheck = icCheck;
  icFilterList = icFilterList;
  icMail = icMail;
  icMoreHoriz = icMoreHoriz;
  icNot = icNot;
  icReply = icReply;
  icSearch = icSearch;
  icWithoutAnswer = icWithoutAnswer;

  constructor(
    private dialog: MatDialog,
    private pqrsService: PqrsService
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.dataSource = new MatTableDataSource();


    this.getPqrData().subscribe(requests => {
      this.subject$.next(requests);
    });


    this.data$.pipe(
      filter<PqrMailbox[]>(Boolean)
    ).subscribe(requests => {
      this.dataSource.data = requests;
      this.requests = requests;
      this.loading = false;
    });


    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }


  getPqrData() {
    return this.pqrsService.getPqrsRequests();
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openRequestDetailDialog(request: PqrMailbox) {
    this.dialog.open(ReplyPqrComponent, {
      data: request
    }).afterClosed().subscribe((request: PqrMailbox) => {
      if (request) {
        this.subject$.next(this.requests);
      }
    });
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

}