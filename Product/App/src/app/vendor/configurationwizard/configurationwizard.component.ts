///<reference types="@types/googlemaps" />
import {Title} from '@angular/platform-browser';
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-configurationwizard',
  templateUrl: './configurationwizard.component.html',
  styleUrls: ['./configurationwizard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfigurationwizardComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

  constructor(
    private _formBuilder: FormBuilder,
    private titleService: Title
  ) { }
  google : any;

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues = [];
  data: string[] = [
    'A1',
    'A2',
    'A3',
    'B1',
    'B2',
    'B3',
    'C1',
    'C2',
    'C3'
  ]
  filteredOptions: Observable<any[]>;

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: '',//['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
    this.filteredOptions = this.searchTextboxControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );
    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');
    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;
 
    this.setCurrentPosition();
  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }
 
  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    
    return filteredList
  }
  setSelectedValues() {
    if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
      this.selectFormControl.value.forEach((e) => {
        if (this.selectedValues.indexOf(e) == -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }
}
