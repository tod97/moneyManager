import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StatsPage } from './stats.page';
import { ChartComponent } from '../component/chart.component';

const routes: Routes = [
  {
    path: '',
    component: StatsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StatsPage, ChartComponent]
})
export class StatsPageModule {}
