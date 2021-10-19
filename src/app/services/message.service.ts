import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IItem } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message = new Subject();

  constructor() { }

  sendMessage(item: IItem): void {
    this.message.next(item);
  }

  getMessage(): Observable<any> {
    return this.message.asObservable();
  }
}
