import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { PqrMailbox } from 'src/app/models/pqr.model';
import { UsersService } from 'src/app/service/users/users.service';
import { ViewDetailDialogComponent } from '../view-detail-dialog/view-detail-dialog.component';

import icShow from '@iconify/icons-ic/twotone-remove-red-eye';
import { PqrsService } from 'src/app/service/users/pqrs.service';

@Component({
  selector: 'spc-prq-table',
  templateUrl: './prq-table.component.html',
  styleUrls: ['./prq-table.component.scss']
})

export class PrqTableComponent implements OnInit {

  @Input('idUser') idUser: string;

  displayedColumns: string[] = ['id', 'date', 'type', 'description', 'answer'];

  dataSource = new MatTableDataSource<PqrMailbox>();

  loading: boolean = false;

  icShow = icShow;

  constructor(
    private dialog: MatDialog,
    private pqrService: PqrsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.pqrService.getPqrsByUser(this.idUser).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.loading = false;
    })
  }

  openDetailDialog(title: string, elements: string[]) {
    this.dialog.open(ViewDetailDialogComponent, {
      data: {
        title,
        elements
      }
    });
  }

}
