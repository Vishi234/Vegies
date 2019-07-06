import { Component, OnInit } from '@angular/core';
import { AdminCategoryService } from './admin-category.service'
import { categoryFields } from './categoryFields';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit 
{

  constructor(private _adminCategory : AdminCategoryService) { }
  categoryData=new categoryFields(0,'','',1,0,'','','A',0,1);
  subCategoryData={}
  catResponse:any;
  ngOnInit() {
    this._adminCategory.getAPIData().subscribe((response)=>{
      console.log('response is ', response)
      this.catResponse=response;
      // console.log("rowdatatttttt",this._adminCategory)
      // var result = Object.keys(response).map(function(key) {
      // return [Number(key), response[key]];
      // });
      // //this.catResponse=result[1][1];
      // console.log("outtttttt",result)
  },(error) => {
      console.log('error is ', error)
  })
  }

  addCategoryData()
  {
    console.log("hiiiiiiiiiiii",this.categoryData);
    this._adminCategory.adminCategory(this.categoryData).subscribe((res)=>
    {
    
        console.log('response---',res.body);
      });  

  }

  addSubCategoryData()
   {

    this._adminCategory.adminCategory(this.subCategoryData).subscribe((res)=>{

        console.log('Response body---',res.body);
      },
    (error)=>{
      console.log(error);
    })  


  }

}
