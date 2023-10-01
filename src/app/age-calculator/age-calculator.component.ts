import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { filter, map, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-age-calculator',
  templateUrl: './age-calculator.component.html',
  styleUrls: ['./age-calculator.component.scss']
})
export class AgeCalculatorComponent implements OnInit {
  averageAge: number | undefined;

  persons = [
    { id: 1, name: "Jan Kowalski" },
    { id: 2, name: "John Doe" },
    { id: 3, name: "Jarek Kaczka" }
  ];

  ages = [
    { person: 1, age: 18 },
    { person: 2, age: 24 },
    { person: 3, age: 666 }
  ];

  locations = [
    { person: 1, country: "Poland" },
    { person: 2, country: "USA" },
    { person: 3, country: "Poland" }
  ];

  constructor() { }

  ngOnInit(): void {
    // Combine the data arrays and create an observable.
    const combinedData = this.persons.map(person => {
      const location = this.locations.find(location => location.person === person.id);
      const age = this.ages.find(age => age.person === person.id)?.age || 0;
      return {
        ...person,
        country: location ? location.country : 'Unknown',
        age: age
      };
    });

    const dataObservable = from(combinedData);

    // Filter persons living in Poland.
    const polishPersonsObservable = dataObservable.pipe(
      filter(person => person.country === 'Poland')
    );

    // Calculate the sum of ages and the count of persons.
    const ageStatsObservable = polishPersonsObservable.pipe(
      reduce((acc, person) => ({ sum: acc.sum + person.age, count: acc.count + 1 }), { sum: 0, count: 0 })
    );

    // Calculate the average age.
    ageStatsObservable.subscribe(stats => {
      this.averageAge = stats.count > 0 ? stats.sum / stats.count : undefined;
      if(this.averageAge !== undefined) {
        console.log(`Average age of persons living in Poland: ${this.averageAge}`);
      } else {
        console.log('Failed to calculate average age:');
      }
    });
  }
}
