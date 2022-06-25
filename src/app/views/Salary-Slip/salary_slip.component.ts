import { Component } from '@angular/core';
@Component({
  selector: 'app-form-controls',
  templateUrl: './salary_slip.component.html',
  styleUrls: ['./salary_slip.component.scss']
})
export class FormControlsComponent {

  public favoriteColor = '#26ab3c';

  constructor() { }

  ngOnInit(): void {
  }

  
  data = [
    {
      emp_code: "1",
      name: "Kishor",
      salary_month: "feb",
      earning: "30000",
      deduction: "200",
      net_salary: "50000",

    },
    {
      emp_code: "1",
      name: "Kishor",
      salary_month: "feb",
      earning: "30000",
      deduction: "200",
      net_salary: "50000",

    },
    {
      emp_code: "1",
      name: "Kishor",
      salary_month: "feb",
      earning: "30000",
      deduction: "200",
      net_salary: "50000",

    },
    {
      emp_code: "1",
      name: "Kishor",
      salary_month: "feb",
      earning: "30000",
      deduction: "200",
      net_salary: "50000",

    },
  ]

}
