import { ToasterModule } from 'angular2-toaster';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { ResetPasswordComponent } from './reset-password.component';
import { routing }       from './reset-password.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    ToasterModule
  ],
  declarations: [
    ResetPasswordComponent
  ]
})
export class ResetPasswordModule {}
