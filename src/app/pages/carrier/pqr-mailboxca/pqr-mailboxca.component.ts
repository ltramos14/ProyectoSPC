import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'spc-pqr-mailboxca',
  templateUrl: './pqr-mailboxca.component.html',
  styleUrls: ['./pqr-mailboxca.component.scss']
})
export class PqrMailboxcaComponent implements OnInit {

  public userId: string;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    const {id} = this.router.snapshot.params;
    this.userId = id;
  }

}
