import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, public backendService: BackendService, private router: Router) {}
  public showNotification = false;
  public addChildForm: any;
  @Input() currentPage!: number;

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, [Validators.required, this.validateDate, this.validateAgeRange]],
    });
  }

  onSubmit() {
    if (this.addChildForm.valid) {
      this.backendService.addChildData(this.addChildForm.value, this.currentPage);

      this.showNotification = true;
      
      this.router.navigate([], { queryParams: { page: this.currentPage } });
    }
  }

  closeModal() {
    this.showNotification = false;
  }


  validateDate(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    return selectedDate > currentDate ? { futureDate: true } : null;
  }

  validateAgeRange(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    
    const age = currentDate.getFullYear() - selectedDate.getFullYear();

    if (age < 5 || age > 18) {
      return { ageRange: true };
    }

    return null;
  }
}
