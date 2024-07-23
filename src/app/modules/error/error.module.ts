import { ErrorRoutingModule } from './error-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [ErrorRoutingModule, HttpClientModule, AngularSvgIconModule.forRoot()],
})
export class ErrorModule {}
