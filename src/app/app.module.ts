import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
// import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';

// export const customCurrencyMaskConfig = {
//   align: 'left',
//   allowNegative: false,
//   allowZero: true,
//   decimal: ',',
//   precision: 2,
//   prefix: 'R$ ',
//   suffix: '',
//   thousands: '.',
//   nullable: true,
//   min: undefined,
//   max: undefined,
//   inputMode: CurrencyMaskInputMode.FINANCIAL,
// };
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
