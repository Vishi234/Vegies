import { Component, OnInit } from '@angular/core';
import { AdminCategoryService } from './admin-category.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private _adminCategory : AdminCategoryService) { }
  categoryData={}
  subCategoryData={}
  catResponse:any;
  ngOnInit() {
    this._adminCategory.getAPIData().subscribe((response)=>{
      console.log('response is ', response)
      this.catResponse=response;
    //   console.log("rowdatatttttt",this._adminCategory)
      // var result = Object.keys(response).map(function(key) {
      //   return [Number(key), response[key]];
      // });
      // //this.catResponse=result[1][1];
      // console.log("outtttttt",result)
  },(error) => {
      console.log('error is ', error)
  })
  }

  addCategoryData(){
    console.log("hiiiiiiiiiiii",this.categoryData);
    this._adminCategory.adminCategory(this.categoryData)
    .subscribe(
      catData=>{
        localStorage.setItem('token',catData.token);
        console.log(catData)
      },
      err=>console.error(err)
    )
    //console.log(this.registerUserData);
  }

  addSubCategoryData(){
    console.log("hiiiiiiiiiiii",this.subCategoryData);
    this._adminCategory.adminCategory(this.subCategoryData)
    .subscribe(
      subCatData=>{
        localStorage.setItem('token',subCatData.token);
        console.log(subCatData)
      },
      err=>console.error(err)
    )
    //console.log(this.registerUserData);
  }

}
