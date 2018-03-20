/**
 * Created by lalo on 07/10/17.
 */

import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RequestType } from './request-type.enum';
import { NotificationService } from './notification/notification.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Injectable()
export class GeneralService {
  private MAX_STRING_LENGTH = 40;
  protected bethelUrl: string;

  public showFirstNChars(word: string, long?: number) {
    if (!word) {
      return '';
    }
    const wordLength = word.length;
    if (!long) {
      return wordLength > this.MAX_STRING_LENGTH ? word.slice(0, this.MAX_STRING_LENGTH) + '...' : word;
    }
    let possibleWord = long <= wordLength ? word.slice(0, long) : word.slice(0, this.MAX_STRING_LENGTH);
    if (long > this.MAX_STRING_LENGTH) {
      possibleWord += '...';
    }
    return possibleWord;
  }

  constructor(protected http: HttpClient, protected notificationService: NotificationService,
              protected  store: Store<AppState>) {
    this.bethelUrl = isDevMode() ? 'http://localhost:3000' : 'https://young-harbor-94746.herokuapp.com';
  }

  private appendTokenToUrl(endpointUrl: string, token: string) {
    const strToken = token.length === 0 ? '' : '?' + token;
    return this.bethelUrl + endpointUrl + strToken;
  }

  /**
   *
   * @param requestType
   * @param objectToSend
   * @param endpointUrl
   * @returns {Observable<R|T>}
   */
  public hitBethelApi(requestType: RequestType, objectToSend: any, endpointUrl: string) {

    if (requestType === RequestType.POST) {
      return this.http.post(this.bethelUrl + endpointUrl, JSON.stringify(objectToSend));
    }

    if (requestType === RequestType.GET) {
      const objKeys = Object.keys(objectToSend);
      let queryParams = new HttpParams();
      if (objKeys.length > 0) {
        for (const objKey of objKeys) {
          queryParams = queryParams.set(objKey, objectToSend[ objKey ]);
        }
      }
      return this.http.get(this.bethelUrl + endpointUrl, { params: queryParams });
    }

    if (requestType === RequestType.PUT) {
      return this.http.put(this.bethelUrl + endpointUrl, JSON.stringify(objectToSend));
    }

    // Then delete method:
    return this.http.delete(this.bethelUrl + endpointUrl);
  }

}
