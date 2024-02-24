import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sgin-up',
  templateUrl: './sgin-up.component.html',
  styleUrls: ['./sgin-up.component.scss']
})
export class SginUpComponent {
  registerForm = new FormGroup(
    {
      name : new FormControl('')
    }
  );
  register(form:any){
    
  }
}
