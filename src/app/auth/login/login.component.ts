import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit{
    constructor(public authService: AuthService) {}

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
    ngOnInit() {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
    }

    isLoading = false;
    private authStatusSub: Subscription;

    onLogin(form: NgForm){
        console.log("in login fn")
        if(form.invalid) {
            return;
        }
        this.isLoading = true;
        this.authService.login(form.value.email, form.value.password);
    }
}