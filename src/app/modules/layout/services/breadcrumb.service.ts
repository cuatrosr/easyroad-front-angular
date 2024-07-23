import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private homeBreadcrumbSubject = new BehaviorSubject<MenuItem | undefined>(undefined);
  homeBreadcrumb$ = this.homeBreadcrumbSubject.asObservable();

  private breadcrumbsSubject = new BehaviorSubject<MenuItem[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  setHomeBreadcrumb(homeBreadcrumb: MenuItem) {
    this.homeBreadcrumbSubject.next(homeBreadcrumb);
  }

  setBreadcrumbs(breadcrumbs: MenuItem[]) {
    this.breadcrumbsSubject.next(breadcrumbs);
  }
}
