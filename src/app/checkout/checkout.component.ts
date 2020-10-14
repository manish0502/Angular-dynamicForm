import { Component, OnInit } from '@angular/core';
import { FormGroup ,Validators ,FormControl , FormBuilder, FormArray} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm:FormGroup //step3

  itemsArr= FormArray;
  data:Observable<any>
 

  constructor(private formBuilder: FormBuilder) {

    this.checkoutForm = formBuilder.group({ //@building the form
 
        emailAddr : ['' , [
                     Validators.required,
                     Validators.email 
                     ]
                    ],
        quantity: ['' , Validators.required],
        terms :['' , Validators.requiredTrue] ,//for checkbox it will be requiredTrue
        items: this.formBuilder.array([   //FormArray
          this.formBuilder.group({
            itemId: ['1'],
            itemName: ['manish'],
            itemDesc: ['Programmer'],
            itemDone: ['', Validators.requiredTrue]

          })
        ])
    }) 

   }

   
  ngOnInit():void {
    
    

    //You can set Values
    // this.checkoutForm.get('items').setValue([{
    //         itemId: ['10'],
    //         itemName: ['manishKr'],
    //         itemDesc: ['Pro Programmer'],
    //         itemDone: ['', Validators.requiredTrue]
    // }])


    // ----------------------ARRAY OPERATIONS---------------------------

    //it will give one because we have only one in the group
    console.log(this.checkoutForm.get('items').value.length)

    // we can get the details of the items
    console.log(this.checkoutForm.get('items').value);

    // i wanted to print the first value which means index will be 0
    // also print the itemName
    
    const itemVal= this.checkoutForm.get('items').value;
    console.log(itemVal[0].itemName);

    //Reset the value of array
    //this.checkoutForm.get('items').reset();

   this.checkoutForm.statusChanges.subscribe(data =>{
      console.log(data);
   })
     
  }

  postData(){
    console.log(this.checkoutForm)
  }

  //we are reset the value
  resetForm(){

    this.checkoutForm.reset();
  }

  //we need to get the latest items

  get items(){
    return this.checkoutForm.get('items') as FormArray;
  }

  // @whenever user clicks on the add new row- a new elememnt be inserted formArray
  // @our FormArray that we are working is "items"

  addNewItem(){
    const itemLength = this.items.length;
    const newItem = this.formBuilder.group({

      itemId: [itemLength + 1],
      itemName: [''],
      itemDesc: [''],
      itemDone: ['', Validators.requiredTrue]
    })
    this.items.push(newItem);

  }

  removeItem(itemId){
    
    this.items.removeAt(itemId)
    console.log(`item has been removed which has index ` +itemId);

  }

}
