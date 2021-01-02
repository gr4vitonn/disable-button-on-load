import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrowserEventsService {

  constructor() {}

  readonly onLoad$: Observable<Event> = fromEvent<Event>(window, "load").pipe(shareReplay(1));

}
