import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../general_files/user.model';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckingUniqueData} from '../general_files/data_validator';
import { UserService } from '../general_files/services/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  @Input() user: User;
  myForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,private userService: UserService) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      number:[this.user.id, Validators.required],
      name: [this.user.name, Validators.required],
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      hobbies: this.formBuilder.array([]),
      phoneNumbers: this.formBuilder.array([]),
    });
    this.buildHobbies();
    this.buildPhoneNumbers();
  }

  buildHobbies(): void {
    if (this.user.hobbies) {
      this.user.hobbies.forEach((hobby: string) =>
        this.hobbiesGroup.push(this.newHobby(hobby)));
    }
  }

  buildPhoneNumbers(): void {
    if (this.user.phoneNumbers) {
      this.user.phoneNumbers.forEach((phoneNumber: string) =>
        this.phoneNumbersGroup.push(this.newPhoneNumber(phoneNumber)));
    }
  }

  get hobbiesGroup(): FormArray {
    return this.myForm.get('hobbies') as FormArray;
  }

  get phoneNumbersGroup(): FormArray {
    return this.myForm.get('phoneNumbers') as FormArray;
  }

  addHobby(): void {
    this.hobbiesGroup.push(this.newHobby());
  }


  addPhoneNumber(): void {
    this.phoneNumbersGroup.push(this.newPhoneNumber());
  }


  newHobby(hobby: string = ''): FormGroup {
    return this.formBuilder.group({
      hobbyName: [hobby, Validators.compose([
        Validators.required, CheckingUniqueData(this.hobbiesGroup, 'hobbyName')
      ])]
    });
  }


  newPhoneNumber(phoneNumber: string = ''): FormGroup {
    return this.formBuilder.group({
      phoneNumber: [phoneNumber, Validators.compose([
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

  onSubmit(): void {
    if (this.myForm.valid) {
      const hobbies = [];
      for (let i = 0; i < this.hobbiesGroup.length; i++) {
        hobbies.push(this.hobbiesGroup.at(i).get('hobbyName').value);
      }
      const phoneNumbers = [];
      for (let i = 0; i < this.phoneNumbersGroup.length; i++) {
        phoneNumbers.push(this.phoneNumbersGroup.at(i).get('phoneNumber').value);
      }
        const id = this.myForm.controls.number.value;
        const name = this.myForm.controls.name.value;
        const username = this.myForm.controls.username.value;
        const password = this.myForm.controls.password.value;
        const newUser: User = {id, name, username, password, hobbies, phoneNumbers} as User;
        console.log(newUser);
        this.activeModal.close(newUser);
    }
  }
}
