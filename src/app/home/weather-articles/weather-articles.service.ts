import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherArticlesService {
  private baseUrl = 'https://weather338.p.rapidapi.com/news/list?offset=0&limit=10';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'x-rapidapi-host': 'weather338.p.rapidapi.com',
      'x-rapidapi-key': '46768ee6efmshbedb708d75e6d30p12216bjsn45a457464048'
    })
  };

  loadArticles(): Observable<any> {
    return this.http.get(this.baseUrl, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandling)
      );
  }

  errorHandling(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
