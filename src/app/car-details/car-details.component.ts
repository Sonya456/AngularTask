import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent {
  @Input() car: any;
  serviceForm: FormGroup;
  isSectionCollapsed = false;

  constructor(
    private storageService: StorageService,
    private formBuilder: FormBuilder
  ) {
    this.serviceForm = this.formBuilder.group({
      part: '',
      cost: '',
    });
  }

  addService() {
    const newService = this.serviceForm.value;
    this.storageService.saveService(this.car.id, newService);
    if (this.car.services) {
      this.car.services.push(newService);
    } else {
      this.car.services = [newService];
    }
    this.serviceForm.reset();
  }



  ngOnInit() {
    if (!this.car.services) {
      this.car.services = [];
    }
}

}

