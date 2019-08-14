import { Component, NgZone } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../service/storage.service';
import { Subscription } from 'rxjs';
import { Expense } from '../class/expense';

import * as moment from 'moment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  viewList = ['none', 'daily', 'weekly', 'monthly'];
  historyView: string;
  private historySubs: Subscription;
  expenseList: Expense[];
  private expenseListSubs: Subscription;
  formattedList: any = [];

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  constructor(
    private toastCtrl: ToastController,
    private storage: StorageService
  ) {

    this.historyView = this.storage.hvGet();
    this.showDivider();
    this.historySubs = this.storage.historyViewChanged.subscribe(historyView => {
      this.historyView = historyView;
      this.showDivider();
    });

    this.expenseList = this.storage.elGet();
    this.expenseListSubs = this.storage.expenseListChanged.subscribe(expenseList => {
      this.expenseList = expenseList;
      this.showDivider();
    });
  }

  changeView() {
    const index = this.viewList.indexOf(this.historyView);
    this.storage.setHistoryView(this.viewList[(index + 1) % 4]);
    //this.presentToast('View changed to ' + this.viewList[(index + 1) % 4]);
  }

  showDivider() {
    if (this.expenseList && this.expenseList.length > 0) {
      if (this.historyView !== 'none') {
        this.formattedList = [];
        for (let i = 0; i < this.expenseList.length; i++) {
          switch (this.historyView) {
            case 'daily':
              if (i === 0 || (i > 0 &&
                !moment(this.expenseList[i].getDate()).startOf('day').isSame(moment(this.expenseList[i - 1].getDate()).startOf('day')))) {
                  this.formattedList.push({
                    formatDate: moment(this.expenseList[i].getDate()).startOf('day').format('DD MMMM YYYY')
                  });
              }
              this.formattedList.push(this.expenseList[i]);
              break;
            case 'weekly':
              if (i === 0 || (i > 0 &&
                !moment(this.expenseList[i].getDate()).startOf('week').isSame(moment(this.expenseList[i - 1].getDate()).startOf('week')))) {
                  this.formattedList.push({
                    formatDate: 'Week of: ' + moment(this.expenseList[i].getDate()).startOf('week').format('DD MMMM YYYY')
                  });
              }
              this.formattedList.push(this.expenseList[i]);
              break;
            case 'monthly':
              if (i === 0 || (i > 0 &&
                !moment(this.expenseList[i].getDate()).startOf('month').isSame(moment(this.expenseList[i - 1].getDate()).startOf('month')))) {
                  this.formattedList.push({
                    formatDate: moment(this.expenseList[i].getDate()).startOf('month').format('MMMM YYYY')
                  });
              }
              this.formattedList.push(this.expenseList[i]);
              break;
          }
        }
      } else {
        this.formattedList = [];
        this.formattedList.push({
          formatDate: 'Total'
        });
        for (const el of this.expenseList) {
          this.formattedList.push(el);
        }
      }
      let sum = 0;
      for (let i = this.formattedList.length - 1; i >= 0; i--) {
        if (!this.formattedList[i].formatDate) {
          sum += this.formattedList[i].amount;
        } else {
          this.formattedList[i].amount = sum;
          sum = 0;
        }
      }
      console.log(this.formattedList);
    }
  }

}
