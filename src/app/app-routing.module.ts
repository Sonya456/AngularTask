import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { AgeCalculatorComponent } from './age-calculator/age-calculator.component';

const routes: Routes = [
  { path: 'list', component:  CarListComponent},
  { path: 'details', component:  CarDetailsComponent},
  { path: 'calculator', component:  AgeCalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
