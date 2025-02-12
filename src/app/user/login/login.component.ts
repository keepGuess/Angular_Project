import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Router,
  RouterLink,
} from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone : true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit{

    formBuilder = inject(FormBuilder)  

    constructor(
                private service:AuthService, 
                private router:Router,
                private toastr:ToastrService){}
         
  ngOnInit(): void {
    if(this.service.isLoggedIn())
    this.router.navigateByUrl('/dashboard')
  }
    isSubmitted: boolean = false;

    form = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required],
    })

    hasDisplayableError(controlName: string):Boolean {
      const control = this.form.get(controlName);
      return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
     }

     onSubmit(){
        this.isSubmitted = true;
        if(this.form.valid){
              this.service.signin(this.form.value).subscribe({
                next:(res:any)=>{
                   this.service.saveToken(res.token);
                   this.router.navigateByUrl('/dashboard')
                },
                error:err=>{
                   if(err.status==400)
                    this.toastr.error('Incorrect email or password.' , 'Login failed')
                   else
                     console.log('error during login:\n' , err);
                }
          })
        }
     }
}
