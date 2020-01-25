import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './angular-plus-vue.component.html',
})
export class AngularPlusVueComponent {
  angularValue: string;
  valueFromVue: string;
  valueFromVue2: string;

  clickButton(){
    this.angularValue = 'We clicked the button';
  }

  hSomeEvent($event){
    this.valueFromVue = $event.detail[0];
  }
  
  hSomeOtherEvent($event){
    this.valueFromVue2 = `${$event.detail[0]} From the second element`;
  }
}