import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Calculation, CalculationResultType } from "../types/calculation";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor (private http: HttpClient) { }

  /**
   * @returns - Calculation history
   */
  history(): Observable<Array<Calculation>> {
    return this.http.get<Array<Calculation>>(`${environment.api_url}/history`);
  }

  /**
   * Adds two numbers
   * @param a - First number
   * @param b - Second number
   * @returns - Calculation result
   */
  add(a: Number, b: Number): Observable<Calculation> {
    return this.http.post<Calculation>(`${environment.api_url}/add`, { a, b });
  }

  /**
   * Subtracts two numbers
   * @param a - First number
   * @param b - Second number
   * @returns - Calculation result
   */
  subtract(a: Number, b: Number): Observable<Calculation> {
    return this.http.post<Calculation>(`${environment.api_url}/subtract`, { a, b });
  }

  /**
   * Multiplies two numbers
   * @param a - First number
   * @param b - Second number
   * @returns - Calculation result
   */
  multiply(a: Number, b: Number): Observable<Calculation> {
    return this.http.post<Calculation>(`${environment.api_url}/multiply`, { a, b });
  }

  /**
   * Divides two numbers
   * @param a - First number
   * @param b - Second number
   * @returns - Calculation result
   */
  divide(a: Number, b: Number): Observable<Calculation> {
    if (b === 0) {
      throw new Error('Division by zero is not possible')
    }
    return this.http.post<Calculation>(`${environment.api_url}/divide`, { a, b });
  }

  /**
   * Sends an API call to perform a calculation, based on the given type
   * @param a - The first number
   * @param b - The second number
   * @param type The calculation type
   */
  byType(a: Number, b: Number, type: CalculationResultType): Observable<Calculation> {
    switch (type) {
      case CalculationResultType.ADDITION:
        return this.add(a, b);
      case CalculationResultType.SUBTRACTION:
        return this.subtract(a, b);
      case CalculationResultType.MULTIPLICATION:
        return this.multiply(a, b);
      case CalculationResultType.DIVISION:
        return this.divide(a, b);
      default:
          throw new Error('Unsupported arithmetic operation');
    }
  }
}
