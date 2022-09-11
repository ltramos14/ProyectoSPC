import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'spc-pqr-mailboxpr',
  templateUrl: './pqr-mailboxpr.component.html',
  styleUrls: ['./pqr-mailboxpr.component.scss']
})
export class PqrMailboxprComponent implements OnInit {
  
  public userId: string;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    const {id} = this.router.snapshot.params;
    this.userId = id;
  }
}
