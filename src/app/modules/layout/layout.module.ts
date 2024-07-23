import { LayoutRoutingModule } from './layout-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [LayoutRoutingModule, HttpClientModule, AngularSvgIconModule.forRoot()],
})
export class LayoutModule {}
