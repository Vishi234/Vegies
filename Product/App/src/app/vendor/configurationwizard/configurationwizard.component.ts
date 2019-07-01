import { Component, ViewChild, OnInit, ElementRef,NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import { google } from '@google/maps';

@Component({
  selector: 'app-configurationwizard',
  templateUrl: './configurationwizard.component.html',
  styleUrls: ['./configurationwizard.component.scss']
})
export class ConfigurationwizardComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone
    ) { }
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  @ViewChild('search', { static: true }) public searchElement: ElementRef;
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
      this.mapsAPILoader.load().then(
        O=>{
          let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement,
            {
              types:["address"]
            });
            autocomplete.addListener("place_changed",()=>
            {
              this.ngZone.run(()=>
              {
                let place:google.maps.places.PlaceResult = autocomplete.getPlace();
                if(place.geometry === undefined || place.geometry === null)
                {
                  return;
                }
              })
            })
        }
       
      )
  }
  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    console.log(filteredList);
    return filteredList
  }
  clearSearch(event) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
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
