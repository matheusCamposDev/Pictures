import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VmessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    VmessageModule,
    RouterModule,
    FormsModule
  ]
})
export class HomeModule { }