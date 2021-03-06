import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { KeysPipe } from '../pipe/keys.pipe';

import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    MomentModule
  ],
  declarations: [Tab1Page, KeysPipe]
})
export class Tab1PageModule {}
