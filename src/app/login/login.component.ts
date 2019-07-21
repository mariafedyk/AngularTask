import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../general_files/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  badEntrance: boolean;
  user = {
    username: 'user',
    password: '12345'
  };
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
  }
  
  onSubmit() {
    const formData = this.form.value;
    if (formData.username === this.user.username && formData.password === this.user.password) {
      this.authService.logIn();
      window.localStorage.setItem('user', JSON.stringify(this.user));
      window.sessionStorage.setItem('user', JSON.stringify(this.user));
      this.badEntrance = false;
      this.router.navigate(['/database']);
    } 
    else{
      this.badEntrance = true;
    } 
  }

}