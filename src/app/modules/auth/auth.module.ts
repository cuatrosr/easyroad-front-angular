import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [AuthRoutingModule, HttpClientModule, AngularSvgIconModule.forRoot()],
})
export class AuthModule {}
