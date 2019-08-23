import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Expense } from '../class/expense';
import { StorageService } from '../service/storage.service';
import { ChartComponent } from '../component/chart.component';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  historyView: string;
  private historySubs: Subscription;
  expenseList: Expense[];
  private expenseListSubs: Subscription;
  formattedStats: any;

  constructor(
    private storage: StorageService
  ) {

    this.historyView = this.storage.hvGet();
    this.historySubs = this.storage.historyViewChanged.subscribe(historyView => {
      this.historyView = historyView;
    });

    this.expenseList = this.storage.elGet();
    this.formatStats();
    this.expenseListSubs = this.storage.expenseListChanged.subscribe(expenseList => {
      this.expenseList = expenseList;
      this.formatStats();
    });
  }

  ngOnInit() {}

  formatStats() {
    console.log(this.expenseList);
    const format = {labels: [], total: [], datasets: [{data: [], backgroundColor: []}]};
    let sum = 0;
    for (const el of this.expenseList) {
      const index = format.labels.indexOf(el.getTag().getName());
      sum += el.getAmount();
      if ( index === -1) {
        format.labels.push(el.getTag().getName());
        format.total.push(el.getAmount());
        format.datasets[0].backgroundColor.push(this.fromColorToRGB(el.getTag().getColor()));
      } else {
        format.total[index] += el.getAmount();
      }
    }
    for (let i = 0; i < format.total.length; i++) {
      format.datasets[0].data.push(Math.round((format.total[i] * 100) / sum));
    }
    this.formattedStats = format;
    console.log(this.formattedStats);
  }

  fromColorToRGB(color) {
    switch (color) {
      case 'primary':
        return 'rgba(56,128,255)';
      case 'secondary':
        return 'rgba(12,209,232)';
      case 'tertiary':
        return 'rgba(112,68,255)';
      case 'success':
        return 'rgba(16,220,96)';
      case 'warning':
        return 'rgba(255,206,0)';
      case 'danger':
        return 'rgba(245,61,61)';
      case 'medium':
        return 'rgba(152,154,162)';
      case 'light':
        return 'rgba(152,154,162)';
      case 'dark':
      default:
        return 'rgba(34,34,34)';
    }
  }
}
