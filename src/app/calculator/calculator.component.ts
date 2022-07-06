import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../service/calculator.service';
import { Calculation, CalculationResultType } from '../types/calculation';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  results: Array<Calculation> = [];
  formData: Calculation = {
    type: CalculationResultType.ADDITION,
    a: NaN,
    b: NaN,
  };

  constructor(private calculatorService: CalculatorService) {  }

  ngOnInit(): void {
    this.loadHistory();
  }


  loadHistory(): void {
    this.calculatorService.history().subscribe(
      (response: Array<Calculation>) => this.results = response
      // TODO: error handling
    );
  }

  calculate(): void {
    this.calculatorService.byType(this.formData.a, this.formData.b, this.formData.type).subscribe(
      (response: Calculation) => this.results.unshift(response)
      // TODO: error handling
    );
  }

}