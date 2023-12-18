import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getuid } from 'process';
import { UserData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private router: Router) { }

  login(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  registrar(user:UserData){
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
  }
  authState(){
    return this.auth.authState
  }
  logout(){
    this.auth.signOut();
  }
  stateUser(){
    return this.auth.authState;
  }
  async getUid(){
    const user = await this.auth.currentUser;
    return user.uid;
    console.log("uid => ", user.uid);
  }
}
