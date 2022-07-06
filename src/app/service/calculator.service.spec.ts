import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Calculation, CalculationResultType } from '../types/calculation';
import { environment } from 'src/environments/environment';

describe('CalculatorService', () => {
    let service: CalculatorService;
    let httpMock: HttpTestingController;

    const a = 10;
    const b = 20;
    const mockResponse = (type: CalculationResultType, result: Number, first = a, second = b): Calculation => {
        return { a: first, b: second, type, result };
    };

    beforeEach(() => {
        TestBed.configureTestingModule({ 
            imports: [HttpClientTestingModule],
            providers: [CalculatorService] 
        });
        service = TestBed.inject(CalculatorService);
        httpMock = TestBed.inject(HttpTestingController);
        
    });

    it('can fetch history', () => {
        const mockData = [
            mockResponse(CalculationResultType.ADDITION, 30.0),
            mockResponse(CalculationResultType.SUBTRACTION, 30.0, 40.0, 10.0)
        ];
        service.history().subscribe((response: Array<Calculation>) => {
            expect(response.length).toEqual(2);
            expect(response[0]).toEqual(mockData[0]);
            expect(response[1]).toEqual(mockData[1]);
        });
        const mock = httpMock.expectOne(`${environment.api_url}/history`);
        expect(mock.request.method).toEqual('GET');
        expect(mock.request.body).toBeUndefined;
        mock.flush(mockData);
    });

    it('should add two numbers', () => {
        service.add(a, b).subscribe((response: Calculation) => {
            expect(response.a).toEqual(a);
            expect(response.b).toEqual(b);
            expect(response.result).toEqual(30.0);
            expect(response.type).toEqual(CalculationResultType.ADDITION);
        });
        const mock = httpMock.expectOne(`${environment.api_url}/add`);
        expect(mock.request.method).toEqual('POST');
        expect(mock.request.body).toEqual({ a, b });
        mock.flush(mockResponse(CalculationResultType.ADDITION, 30.0));
    });

    it('should subtract two numbers', () => {
        service.subtract(a, b).subscribe((response: Calculation) => {
            expect(response.a).toEqual(a);
            expect(response.b).toEqual(b);
            expect(response.result).toEqual(-10.0);
            expect(response.type).toEqual(CalculationResultType.SUBTRACTION);
        });
        const mock = httpMock.expectOne(`${environment.api_url}/subtract`);
        expect(mock.request.method).toEqual('POST');
        expect(mock.request.body).toEqual({ a, b });
        mock.flush(mockResponse(CalculationResultType.SUBTRACTION, -10.0));
    });

    it('should multiply two numbers', () => {
        service.multiply(a, b).subscribe((response: Calculation) => {
            expect(response.a).toEqual(a);
            expect(response.b).toEqual(b);
            expect(response.result).toEqual(200.0);
            expect(response.type).toEqual(CalculationResultType.MULTIPLICATION);
        });
        const mock = httpMock.expectOne(`${environment.api_url}/multiply`);
        expect(mock.request.method).toEqual('POST');
        expect(mock.request.body).toEqual({ a, b });
        mock.flush(mockResponse(CalculationResultType.MULTIPLICATION, 200.0));
    });

    it('should divide two numbers', () => {
        service.divide(0, b).subscribe((response: Calculation) => {
            expect(response.a).toEqual(0);
            expect(response.b).toEqual(b);
            expect(response.result).toEqual(0.0);
            expect(response.type).toEqual(CalculationResultType.DIVISION);
        });
        const mock = httpMock.expectOne(`${environment.api_url}/divide`);
        expect(mock.request.method).toEqual('POST');
        expect(mock.request.body).toEqual({ a: 0, b });
        mock.flush(mockResponse(CalculationResultType.DIVISION, 0.0, 0));
    });
});
