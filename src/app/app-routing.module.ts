import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component'


const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
