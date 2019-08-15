import { Component, NgZone, ViewChild } from '@angular/core';
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

  @ViewChild('content', {static: true}) private content: any;

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

  scrollToBottom() {
    setTimeout( () => {
      document.querySelector('ion-content').scrollToBottom(500);
    }, 100);
  }

  changeView() {
    const index = this.viewList.indexOf(this.historyView);
    this.storage.setHistoryView(this.viewList[(index + 1) % 4]);
    //this.presentToast('View changed to ' + this.viewList[(index + 1) % 4]);
  }

  showDivider() {
    if (this.expenseList && this.expenseList.length > 0) {
      if (this.historyView && this.historyView !== 'none') {
        //SET VIEW DIVIDER
        this.formattedList = [];
        for (let i = 0; i < this.expenseList.length; i++) {
          switch (this.historyView) {
            case 'daily':
              if (i === 0 || (i > 0 &&
                !moment(this.expenseList[i].getDate()).startOf('day').isSame(moment(this.expenseList[i - 1].getDate()).startOf('day')))) {
                  this.formattedList.push({
                    formatDate: moment(this.expenseList[i].getDate()).startOf('day').format('DD MMMM YYYY'),
                    elements: {},
                    amount: 0
                  });
              }
              break;
            case 'weekly':
              if (i === 0 || (i > 0 &&
                !moment(this.expenseList[i].getDate()).startOf('week').isSame(moment(this.expenseList[i - 1].getDate()).startOf('week')))) {
                  this.formattedList.push({
                    formatDate: 'Week of: ' + moment(this.expenseList[i].getDate()).startOf('week').format('DD MMMM YYYY'),
                    elements: {},
                    amount: 0
                  });
              }
              break;
            case 'monthly':
              if (i === 0 || (i > 0 &&
                !moment(this.expenseList[i].getDate()).startOf('month').isSame(moment(this.expenseList[i - 1].getDate()).startOf('month')))) {
                  this.formattedList.push({
                    formatDate: moment(this.expenseList[i].getDate()).startOf('month').format('MMMM YYYY'),
                    elements: {},
                    amount: 0
                  });
              }
              break;
          }
          if (this.formattedList.length > 0) {
            if (!this.formattedList[this.formattedList.length - 1].elements[this.expenseList[i].getTag().getName()]) {
              this.formattedList[this.formattedList.length - 1].elements[this.expenseList[i].getTag().getName()] = {
                tag: this.expenseList[i].getTag(),
                list: [],
                show: false,
                amount: 0
              };
            }
            this.formattedList[this.formattedList.length - 1].elements[this.expenseList[i].getTag().getName()].list.push(
              this.expenseList[i]
            );
            this.formattedList[this.formattedList.length - 1].elements[this.expenseList[i].getTag().getName()].amount += this.expenseList[i].getAmount();
            this.formattedList[this.formattedList.length - 1].amount += this.expenseList[i].getAmount();
          }
        }
      } else {
        //SHOW NO VIEW TOTAL
        this.formattedList = [];
        this.formattedList.push({
          formatDate: 'Total',
          elements: {},
          amount: 0
        });
        for (const el of this.expenseList) {
          if (!this.formattedList[0].elements[el.getTag().getName()]) {
            this.formattedList[0].elements[el.getTag().getName()] = {
              tag: el.getTag(),
              list: [],
              show: false,
              amount: 0
            };
          }
          this.formattedList[0].elements[el.getTag().getName()].list.push(el);
          this.formattedList[0].elements[el.getTag().getName()].amount += el.getAmount();
          this.formattedList[0].amount += el.getAmount();
        }
      }
      console.log(this.formattedList);

      this.scrollToBottom();
    }
  }

}
