import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  admin: boolean = false;

  constructor(private authService:AuthService, 
              private router:Router) { 

              this.authService.authState().subscribe( res => {
                console.log('res => ', res);
                if (res) {
                  this.admin = res.uid === environment.adminuid ? true : false;
                } else {
                  this.admin = false
                }
                
              })

            }

ngOnInit() {
  this.authService.authState().subscribe(res => {
    console.log('res-> ', res);
    if (res){
      this.email = res.email;
    };
  })
}
  async login() {
    console.log('estos datos se envian-> ', this.email);
    const respuesta = await this.authService.login(this.email, this.password)
    this.router.navigate(['/panel']);
  }

  regClick(){
    this.router.navigate(['/registro'])
  }
}