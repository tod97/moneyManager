import * as moment from 'moment';
import { Tag } from './tag';

export class Expense {

  private name: string;
  private amount: number;
  private tag: Tag;
  private date: string;

  constructor(name = '', amount = null, date = moment().format('YYYY-MM-DD'), tag = null) {
    this.name = name;
    this.amount = amount;
    this.tag = tag;
    this.date = date;
  }

  getAmount() {
    return this.amount;
  }

  getDate() {
    return this.date;
  }

  copy() {
    return new Expense(this.name, this.amount, this.date, this.tag);
  }

  clearData() {
      this.name = '';
      this.amount = null;
      this.tag = null;
      this.date = moment().format('YYYY-MM-DD');
  }

  isValid() {
    let valid = true;
    valid = valid && this.name && this.name.trim().length > 0;
    valid = valid && this.amount && this.amount > 0;
    valid = valid && this.tag != null;
    valid = valid && moment(this.date).isValid();
    return valid;
  }
}
