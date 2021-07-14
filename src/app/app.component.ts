import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  demoForm: FormGroup;
  name = new FormControl("");
  course = new FormControl("");
  constructor(private http: HttpClient) {
    this.demoForm = new FormGroup({
      name: this.name,
      course: this.course
    });
  }

  title = 'crud';
  displayedColumns: string[] = ['position', 'name','course', 'weight', 'symbol'];
  dataSource:any;
  data: any;
  datalist: any;
  id:any;


  onEdit(value:any){
   console.log(value);
   this.demoForm.controls['name'].setValue(value.name);
   this.demoForm.controls['course'].setValue(value.courses);
   this.id=value._ID;
   
  }
  onUpdate(){
   this.data = this.demoForm.value;
   this.data._ID=this.id;
   console.log(this.data);
   this.http.post<any>('http://localhost:3005/update', this.data)
   .subscribe((res) => {
     this.data = res;
   });
   this.getUpdateList();
  }
  onDelete(value:any){
    console.log(value);
    this.http.get<any>('http://localhost:3005/delete/'+value).subscribe((res) => {
      this.data = res;
    });
    this.getUpdateList();
  }
  onSubmit() {
    const body = {name:"eyuel"};
    // Process checkout data here
    const headers = { 'content-type': 'application/json'}
        
  this.http.post<any>('http://localhost:3005/create', this.demoForm.value,{headers:headers})
  .subscribe((res) => {
    this.data = res;
  });

    console.log('Your order has been submitted',this.demoForm.value);
    console.log(JSON.stringify(this.demoForm.value));
    console.log(this.data);
    this.getUpdateList();
    }

  async getUpdateList() {
  await this.http.get<any>('http://localhost:3005/getStudents').subscribe((res) => {
    return this.dataSource = res;
  });
  }
   ngOnInit() {
     this.getUpdateList();
}
}