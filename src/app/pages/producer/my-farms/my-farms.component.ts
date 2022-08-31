import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/service/auth/auth.service';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { Farm } from 'src/app/models/farm.model';
import { FarmsService } from 'src/app/service/producer/farms.service';
import { MyFarmsCreateUpdateComponent } from './my-farms-create-update/my-farms-create-update.component';

import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';

import icPlace from '@iconify/icons-ic/twotone-place';
import icLocation from '@iconify/icons-ic/twotone-where-to-vote';
import icMap from '@iconify/icons-ic/twotone-map';
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

  icAdd = icAdd;
  icClose = icClose;
  icPlace = icPlace;
  icLocation = icLocation;
  icMap = icMap;
  icDescription = icDescription;
  icEdit = icEdit;
  icDelete = icDelete;

  farms: Farm[];

  imageDefault: string = './assets/images/logotipos/LogoSPCv1.png';

  loading: boolean = false;

  constructor(
    private farmService: FarmsService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.loading = true;
    const { uid } = await this.authService.getCurrentUser();
    this.farmService.getProducerDoc(uid);
    if (this.getData() !== undefined) {
      this.getData().subscribe(farms => {
        this.farms = farms;
        this.loading = false;
      });
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

  confirmDeleteDialog(farm: Farm) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        message: `¿Estás seguro de que deseas desvincular la finca "${farm.name}" ?`,
        buttonText: {
          ok: "Sí, desvincular",
          cancel: "Cancelar"
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteFarm(farm.id);
      }
    })
  }

  deleteFarm(idFarm: string) {
    this.farmService.deleteFarm(idFarm).then(() => {
      this.snackbar.open('Finca desvinculada satisfactoriamente', 'OK', {
        duration: 3000
      })
    })
  }

  openCoordinatesOnGoogleMaps(farm: Farm): void {
    window.open(`https://www.google.es/maps/search/${ farm.latitude },${ farm.longitude }`, '_blanck')
  }

}
