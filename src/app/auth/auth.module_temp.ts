import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        AngularMaterialModule,
        CommonModule,
        FormsModule
    ]
})
export class AuthModule{

}