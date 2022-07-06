import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CalculatorService } from '../service/calculator.service';
import { Calculation, CalculationResultType } from '../types/calculation';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let mockCalculatorService: CalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      declarations: [ CalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockCalculatorService = TestBed.inject(CalculatorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load previous results', () => {
    const testdata: Array<Calculation> = [{
       a: 10, b: 20, type: CalculationResultType.ADDITION, result: 30.0
    }];

    spyOn(mockCalculatorService, 'history').and.returnValue(of(testdata));
    component.loadHistory();

    expect(mockCalculatorService.history).toHaveBeenCalledTimes(1);
    expect(component.results).toEqual(testdata);
  });

  it('should be able to calculate', () => {
    const mockBase = { a: 100, b: 200, type: CalculationResultType.SUBTRACTION };
    const mockResponse = {
      ...mockBase,
      result: -100.0
    };

    component.formData = mockBase;
    spyOn(mockCalculatorService, 'byType').and.returnValue(of(mockResponse));
    component.calculate();

    expect(mockCalculatorService.byType).toHaveBeenCalledWith(mockBase.a, mockBase.b, mockBase.type);
    expect(component.results).toEqual([mockResponse]);
  });
});
