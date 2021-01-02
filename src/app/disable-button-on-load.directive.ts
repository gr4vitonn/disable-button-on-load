import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators'
import { BrowserEventsService } from './browser-events.service';

@Directive({
  selector: '[appDisableButtonOnLoad]'
})
export class DisableButtonOnLoadDirective implements AfterViewInit, OnDestroy {

  private readonly destroy$ = new Subject();

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly browserEventsService: BrowserEventsService
  ) { }

  ngAfterViewInit(): void {
    this.disableButton();

    this.browserEventsService.onLoad$.pipe(
      takeUntil(this.destroy$),
      delay(2000) // Demo only
    ).subscribe(_ => this.enableButton());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private disableButton(): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'true');
  }

  private enableButton(): void {
    this.renderer.removeAttribute(this.elementRef.nativeElement, "disabled");
  }

}
