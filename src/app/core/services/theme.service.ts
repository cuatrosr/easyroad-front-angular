import { Injectable, effect, signal } from '@angular/core';
import { Theme } from '../models/theme.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>({ mode: 'dark', color: 'base' });
  public theme = signal<Theme>({ mode: 'dark', color: 'base' });

  constructor() {
    this.loadTheme();
    effect(() => {
      this.setTheme();
    });
  }

  private loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      const parsedTheme = JSON.parse(theme);
      this.theme.set(parsedTheme);
      this.themeSubject.next(parsedTheme);
    }
  }

  private setTheme() {
    const currentTheme = this.theme();
    localStorage.setItem('theme', JSON.stringify(currentTheme));
    this.setThemeClass();
    this.themeSubject.next(currentTheme);
  }

  public get isDark(): boolean {
    return this.theme().mode == 'dark';
  }

  private setThemeClass() {
    document.querySelector('html')!.className = this.theme().mode;
    document.querySelector('html')!.setAttribute('data-theme', this.theme().color);
  }

  public get themeChanges() {
    return this.themeSubject.asObservable();
  }
}
