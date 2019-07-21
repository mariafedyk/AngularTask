import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../general_files/user.model';
import {UserService} from '../general_files/services/user.service';
import {Router} from '@angular/router';
import {CheckingUniqueData} from '../general_files/data_validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
  }

  
  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      hobbies: this.formBuilder.array([]),
      phoneNumbers: this.formBuilder.array([])
    });
  }

  
  get hobbiesGroup(): FormArray {
    return this.registrationForm.get('hobbies') as FormArray;
  }

  
  get phoneNumbersGroup(): FormArray {
    return this.registrationForm.get('phoneNumbers') as FormArray;
  }

  
  addHobby(): void {
    this.hobbiesGroup.push(this.newHobby());
  }

 
  addPhoneNumber(): void {
    this.phoneNumbersGroup.push(this.newPhoneNumber());
  }

  
  newHobby(): FormGroup {
    return this.formBuilder.group({
      hobbyName: ['', Validators.compose([Validators.required, CheckingUniqueData(this.hobbiesGroup, 'hobbyName')
      ])]
    });
  }

  
  newPhoneNumber(): FormGroup {
    return this.formBuilder.group({
      phoneNumber: ['', Validators.compose([
        Validators.required, CheckingUniqueData(this.phoneNumbersGroup, 'phoneNumber'),
        Validators.pattern('\\+380\\d{9}|0\\d{9}')
      ])]
    });
  }

  removeHobbyField(i): void {
    this.hobbiesGroup.removeAt(i);
  }

  removePhoneNumberField(i): void {
    this.phoneNumbersGroup.removeAt(i);
  }

  // Creating new user
  createUser(): void {
    const id = 7;
    const name = this.registrationForm.get('name').value;
    const username = this.registrationForm.get('username').value;
    const password = this.registrationForm.get('password').value;
    const hobbies = [];
    for (let i = 0; i < this.hobbiesGroup.length; i++) {
      hobbies.push(this.hobbiesGroup.at(i).get('hobbyName').value);
    }
    const phoneNumbers = [];
    for (let i = 0; i < this.phoneNumbersGroup.length; i++) {
      phoneNumbers.push(this.phoneNumbersGroup.at(i).get('phoneNumber').value);
    }
    const newUser: User = {id, name, username, password, hobbies, phoneNumbers} as User;
    console.log(newUser);
    this.userService.addUser(newUser);
    this.router.navigate(['/database']);
  }
}