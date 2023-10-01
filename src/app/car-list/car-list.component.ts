import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls:  ['./car-list.component.scss'],
})
export class CarListComponent {
  cars: any[] = [];
  carForm: FormGroup;
  isSectionCollapsed = false;

  constructor(
    private storageService: StorageService,
    private formBuilder: FormBuilder
  ) {
    this.cars = this.storageService.getCars();
    this.carForm = this.formBuilder.group({
      id: '',
      model: '',
      make: '',
    });
  }

  addCar() {
    const newCar = this.carForm.value;
    this.storageService.saveCar(newCar);
    this.cars = this.storageService.getCars();
    this.carForm.reset();
  }
}
