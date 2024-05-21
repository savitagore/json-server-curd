import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  User, UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  userForm: FormGroup;
  userId: number=0;

  constructor(private fb: FormBuilder, private userService: UserService,private route: ActivatedRoute,private router:Router) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      if (this.userId) {
        this.userService.getItem(this.userId).subscribe(user => {
          this.userForm.patchValue(user);
        });
      }
    });
  }
  showList(){

      this.router.navigate(['/list']);

  }
  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      this.userService.addItem(user).subscribe(
        (newUser: User) => {
          alert('User Successfully Added');
          this.userForm.reset(); // Reset the form after successful submission
        },
        (error) => {
          console.error('Error occurred while saving user:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  onUpdate(): void {
    if (this.userForm.valid) {
      const updatedUser: User = this.userForm.value;
      this.userService.updateItem(updatedUser).subscribe(
        () => {
          alert('User Successfully Updated');
          this.userForm.reset();
          this.router.navigate(['/users']); // Navigate back to the user list or appropriate page
        },
        (error) => {
          console.error('Error occurred while updating user:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

}
