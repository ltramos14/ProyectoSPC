import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'spc-available-carriers',
  templateUrl: './available-carriers.component.html',
  styleUrls: ['./available-carriers.component.scss']
})
export class AvailableCarriersComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private usersService: UsersService,
    
  ) { }

  ngOnInit(): void {
  }

  getAllCarriers(): void {
    
  }

}
