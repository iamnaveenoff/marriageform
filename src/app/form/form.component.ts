import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  rdstatus: string[] = ['RESIDENT', 'NRI', 'PIO', 'OCI'];

  livingstatus: string[] = ['ALIVE', 'DEAD'];

  bridegrromfather: string[] = ['YES', 'NO'];


  relegions = new FormControl();
  martialstatus = new FormControl();

  relegion: string[] = ['HINDU', 'MUSLIM', 'CHRISTIAN', 'JAIN', 'BUDDHIST', 'SIKH'];
  martialstatuslist: string[] = ['BACHELOR', 'MARRIED', 'DIVORCEE', 'WIDOWER'];

  filteredrelegions: Observable<string[]>;
  filteredmartialstatus: Observable<string[]>;

  bemail = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.bemail.hasError('required') ? 'You must enter a value' :
      this.bemail.hasError('email') ? 'Not a valid email' :
        '';
  }


  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      nameofgroom: ['', Validators.required],
      nationality: ['', Validators.required],
      nameofemployer: ['', Validators.required],
      designation: ['', Validators.required],
      mobileno: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      nameofbride: ['', Validators.required],
      bnationality: ['', Validators.required],
      bnameofemployer: ['', Validators.required],
      bdesignation: ['', Validators.required],
      bmobileno: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({


    });

    this.filteredrelegions = this.relegions.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredmartialstatus = this.martialstatus.valueChanges.pipe(
      startWith(''),
      map(value => this._filters(value))
    );
  }


    private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.relegion.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filters(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.martialstatuslist.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
}
