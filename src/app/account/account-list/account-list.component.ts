import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../user/user.service';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit {
  accounts: any;
  curUserId: any;

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    if (this.userService.isLogged()) {
      console.log('Logged user!');
      this.curUserId = this.route.snapshot.paramMap.get('id');
      if (this.curUserId != null) {
        this.getAccountList();
      }
    }
  }

  async getAccountList() {
    (await this.accountService.getAccountsByUserId(this.curUserId)).subscribe(
      (resData) => {
        this.accounts = resData;
        console.log('Cur user res data:', resData);
        console.log('Cur user accounts:', this.accounts);
      }
    );
  }
}
