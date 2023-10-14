import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private idSource = new BehaviorSubject<string>(''); // Initialize with an empty string or the default value

  currentId = this.idSource.asObservable();

  changeId(newId: string) {
    console.log('I am called!');
    this.idSource.next(newId);
    console.log('ID at Data Service: '+this.currentId)

  }
}
