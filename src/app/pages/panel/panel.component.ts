import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {

  email: string;
  admin: boolean = false;

  constructor(private authService: AuthService,
              private router:Router) { 
                this.authService.authState().subscribe( res => {
                  console.log('res => ', res);
                  if (res) {
                    this.admin = res.uid === environment.adminuid ? true : false;
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
  
  regClick(){
    this.router.navigate(['/registro'])
  }

  dataUp(){
    this.router.navigate(['/carga'])
  }

  feed(){
    this.router.navigate(['/feed'])
  }

  userManager(){
    this.router.navigate(['/control'])
  }
 
  profile(){
    this.router.navigate(['/profile'])
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
