import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'spc-pqr-mailboxco',
  templateUrl: './pqr-mailboxco.component.html',
  styleUrls: ['./pqr-mailboxco.component.scss']
})
export class PqrMailboxcoComponent implements OnInit {

  public userId: string;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    const {id} = this.router.snapshot.params;
    this.userId = id;
  }

}
