import { Component, OnInit } from '@angular/core';
import { MyFarmsCreateUpdateComponent } from './my-farms-create-update/my-farms-create-update.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Farm } from 'src/app/models/farm.model';
import { FarmsService } from 'src/app/service/producer/farms.service';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';

import icPlace from '@iconify/icons-ic/twotone-place';
import icLocation from '@iconify/icons-ic/twotone-where-to-vote';
import icDescription from '@iconify/icons-ic/twotone-description';
import icClose from '@iconify/icons-ic/twotone-close';
import icEdit from "@iconify/icons-ic/twotone-edit";
import icAdd from '@iconify/icons-ic/twotone-add';
import icDelete from "@iconify/icons-ic/twotone-delete";

@Component({
  selector: 'app-my-farms',
  templateUrl: './my-farms.component.html',
  animations: [
    fadeInUp400ms,
    stagger40ms,
    fadeInRight400ms
  ],
})
export class MyFarmsComponent implements OnInit {

  farms: Farm[];

  icAdd = icAdd;
  icClose = icClose;
  icPlace = icPlace;
  icLocation = icLocation;
  icDescription = icDescription;
  icEdit = icEdit;
  icDelete = icDelete;

  imageDefault: string = '../../../../../assets/images/LogoSPCv1.png';

  constructor(
    private farmService: FarmsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

    if (this.getData() !== undefined) {
      this.getData().subscribe(farms => this.farms = farms);
    }

  }

  getData() {
    return this.farmService.farms;
  }

  createFarm() {
    this.dialog.open(MyFarmsCreateUpdateComponent);
  }

  updateFarm(farm: Farm) {
    this.dialog.open(MyFarmsCreateUpdateComponent, {
      data: farm
    });
  }

  deleteFarm(idFarm: string) {
    this.farmService.deletePaymentMethod(idFarm).then(() => {
      this.snackbar.open('Finca desvinculada satisfactoriamente', 'OK', {
        duration: 3000
      })
    })
  }

}
