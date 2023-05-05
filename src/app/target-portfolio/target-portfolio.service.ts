import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Asset } from '../asset';


@Injectable()
export class TargetPortfolioService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getMinRebalance(portfolio: Asset[]) {

    /*return this.http.get<number>('http://localhost:5054/api/getMinRebalance')
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );*/

   
  }

    getRebalancedPortfolio(cash: number, portfolio: Asset[]) {
        const params = new HttpParams()
            .set('cash', cash)

            const headers={
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
            }

        return this.http.post<Asset[]>('http://localhost:5054/api/rebalancePortfolio',portfolio)
            .pipe(
                catchError(this.handleError) // then handle the error
            );

  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }

}


