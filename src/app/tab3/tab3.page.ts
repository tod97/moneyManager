import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../service/storage.service';
import { Tag } from '../class/tag';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  historyView: string;
  private historySubs: Subscription;
  tagList: Tag[];
  private tagListSubs: Subscription;

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
    this.historySubs = this.storage.historyViewChanged.subscribe(historyView => {
      this.historyView = historyView;
    });

    this.tagList = this.storage.tagGet();
    this.tagListSubs = this.storage.tagListChanged.subscribe(tagList => {
      this.tagList = tagList;
    });
  }
}
