import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  saveCar(car: any) {
    const cars = JSON.parse(localStorage.getItem('cars') || '[]');
    cars.push(car);
    localStorage.setItem('cars', JSON.stringify(cars));
  }

  getCars() {
    return JSON.parse(localStorage.getItem('cars') || '[]');
  }
  saveService(carId: string, service: any) {
    const cars = this.getCars();
    const carIndex = cars.findIndex((car: any) => car.id === carId);
    if (carIndex === -1) return;
  
    if (!cars[carIndex].services) {
      cars[carIndex].services = [];
    }
  
    cars[carIndex].services.push(service);
    localStorage.setItem('cars', JSON.stringify(cars));
  }
  
}