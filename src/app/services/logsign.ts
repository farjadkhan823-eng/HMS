import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class Logsign {
  private key = 'accounts';

  getAccounts(): Account[] {
    const data =  localStorage.getItem(this.key);
    return data ? JSON.parse(data) : []
  }

  saveAccounts(list: Account[]) {
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  addAccount(account: Account) {
    let accounts = this.getAccounts();
    account.id = accounts.length ? accounts[accounts.length - 1].id + 1: 1;
    accounts.push(account);
    this.saveAccounts(accounts);
  }
}
