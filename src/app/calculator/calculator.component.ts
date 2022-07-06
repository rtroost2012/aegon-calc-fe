import { HttpErrorResponse } from '@angular/common/http';
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
  formErrorResponse: String = '';
  formData: Calculation = {
    type: CalculationResultType.ADDITION,
    a: NaN,
    b: NaN,
  };

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.calculatorService.history().subscribe({
      next: (response: Array<Calculation>) => this.results = response.reverse(),
      error: (response: HttpErrorResponse) => this.formErrorResponse = response?.message,
   });
  }

  calculate(): void {
    this.formErrorResponse = '';
    try {
      this.calculatorService.byType(this.formData.a, this.formData.b, this.formData.type).subscribe({
        next: (response: Calculation) => this.results.unshift(response),
        error: (response: HttpErrorResponse) => this.formErrorResponse = response?.message
      });
    } catch (clientError: any) {
      this.formErrorResponse = clientError.toString();
    }
  }
}