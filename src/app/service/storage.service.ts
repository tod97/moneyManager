import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Expense } from '../class/expense';
import { Subject } from 'rxjs';
import { Tag } from '../class/tag';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private historyView: string;
  historyViewChanged = new Subject<string>();
  private expenseList = [];
  expenseListChanged = new Subject<Expense[]>();
  private tagList = [];
  tagListChanged = new Subject<Tag[]>();

  constructor(
    private storage: Storage
  ) {
    storage.get('expenseList').then((val) => {
      for (let i = 0; val && i < val.length; i++) {
        val[i] = new Expense(val[i].name, val[i].amount, val[i].date, new Tag(val[i].tag.name, val[i].tag.icon, val[i].tag.color));
      }
      this.expenseList = (val) ? val : [];
      this.expenseListChanged.next(this.expenseList);
    });
    storage.get('tagList').then((val) => {
      for (let i = 0; val && i < val.length; i++) {
        val[i] = new Tag(val[i].name, val[i].icon, val[i].color);
      }
      this.tagList = (val) ? val : [
        new Tag('Generic', 'cash', 'success'),
        new Tag('Party', 'heart', 'danger'),
        new Tag('Travel', 'airplane', 'warning')
      ];
      this.tagListChanged.next(this.tagList);
    });
    storage.get('historyView').then((val) => {
      this.historyView = (val) ? val : 'none';
      this.historyViewChanged.next(this.historyView);
    });
  }

  hvGet() {
    return (' ' + this.historyView).slice(1);
  }

  setHistoryView(historyView) {
    this.historyView = historyView;
    this.storage.set('historyView', historyView);
    this.historyViewChanged.next(this.historyView);
  }

  tagGet() {
    return [...this.tagList];
  }

  tagPush(el: Tag) {
    if (el.isValid()) {
      this.tagList.push(el.copy());
      this.tagListChanged.next(this.tagList);
      this.storeTagList();
    }
  }

  tagDelete(el: Tag) {
    this.tagList = this.tagList.filter(item => item !== el);
    this.tagListChanged.next(this.tagList);
    this.storeTagList();
  }

  private storeTagList() {
    this.storage.set('tagList', this.tagList);
  }

  elGet() {
    return [...this.expenseList];
  }

  elPush(el: Expense) {
    if (el.isValid()) {
      this.expenseList.push(el.copy());
      this.expenseList.sort((a, b) => {
        a = moment(a.date);
        b = moment(b.date);
        return a.isAfter(b);
      });
      this.expenseListChanged.next(this.expenseList);
      this.storeExpenseList();
    }
  }

  elDelete(el: Expense) {
    this.expenseList = this.expenseList.filter(item => item !== el);
    if (this.expenseList.length === 0) { this.historyView = 'none'; }
    this.expenseListChanged.next(this.expenseList);
    this.storeExpenseList();
  }

  private storeExpenseList() {
    this.storage.set('expenseList', this.expenseList);
  }
}
