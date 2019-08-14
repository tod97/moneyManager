import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Expense } from '../class/expense';
import { StorageService } from '../service/storage.service';
import { Tag } from '../class/tag';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  expense: Expense;
  tag: Tag;

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
      this.expense = new Expense();
      this.tag = new Tag();
  }

  addExpense() {
    if (this.expense.isValid()) {
      this.presentToast('Data added to history');
      this.storage.elPush(this.expense);
      this.expense.clearData();
    } else {
      this.presentToast('Invalid data!');
    }
  }

  addTag() {
    if (this.tag.isValid()) {
      this.presentToast('Tag added');
      this.storage.tagPush(this.tag);
      this.tag.clearData();
    } else {
      this.presentToast('Invalid data!');
    }
  }
}
