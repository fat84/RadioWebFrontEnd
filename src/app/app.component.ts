import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host : {
    '(window:scroll)' : 'updateHeader($event)'
  }
})
export class AppComponent implements OnInit {
  title = 'RadioWeb!';
  user;
  public loggedin: boolean;
  isScrolled = false;
  isover = false;
  currPos = 0;
  startPos = 0;
  changePos = 10;
  constructor(private router: Router, private authService : AuthService){}
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(localStorage.getItem("currentUser")){
      this.loggedin = true;
      var store = localStorage.getItem("currentUser")
      console.log(store)
      var user = JSON.parse(store);
      this.user = user["username"];
      this.authService.username = user["username"];
      this.authService.token = user["token"];
      this.router.navigate(['/dashboard']);
    }
    else{
      this.loggedin = false;
    }
    //this.user = this.authService.username;
    this.authService.loginEvent.subscribe(
      data => {
        this.loggedin = data;
        if(data){
          this.user = this.authService.username;
          console.log("going to places");
          this.router.navigate(['/dashboard']);
        }
      }
    );
  }
    

  logout(){
    this.loggedin = false;
    //this.authService.logout();
    localStorage.removeItem("currentUser");
    this.router.navigate(['/']);
  }
  
  updateHeader(evt){
    this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
    if(this.currPos>=this.changePos){
      this.isScrolled =true;
    }else{
      this.isScrolled =false;
    }
    if(this.currPos>=500){
      this.isover = true;
    }else{
      this.isover = false;
    }
  }
}
