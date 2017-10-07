/**
 * Created by lalo on 07/10/17.
 */

import { Injectable, isDevMode } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RequestType } from './request-type.enum';
import { NotificationService } from './notification/notification.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

  public getStringFromObject = function (objToDecode) {
    if (objToDecode === 'null') {
      return 'N/A';
    }
    const dataConverted = JSON.parse(objToDecode);
    const objKeys = Object.keys(dataConverted);
    let strResult = '';
    for (const objKey of objKeys) {
      strResult += dataConverted[ objKey ] + '-';
    }
    strResult = strResult.slice(0, -1);
    return strResult;
  };

  constructor(protected http: HttpClient, protected notificationService: NotificationService) {
    this.bethelUrl = isDevMode() ? 'http://127.0.0.1:8000' : 'http://74.208.72.187:4500/api';
  }

  protected handleError = function (error: Response | any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    this.notificationService.handleErrorNotification(errMsg);
    return Observable.throw(errMsg);
  };

  protected extractData = function (response: Response) {
    return response.json() || {};
  };

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
      return this.http.post(
        endpointUrl, JSON.stringify(objectToSend),
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
        .map((response: Response) => this.extractData(response))
        .catch((error: any) => this.handleError(error));
    }

    if (requestType === RequestType.GET) {
      const objKeys = Object.keys(objectToSend);
      let queryParams = new HttpParams();
      if (objKeys.length > 0) {
        for (const objKey of objKeys) {
          queryParams = queryParams.set(objKey, objectToSend[ objKey ]);
        }
      }
      return this.http.get(this.bethelUrl + endpointUrl, { params: queryParams })
        .map((response: Response) => this.extractData(response))
        .catch((error: any) => this.handleError(error));
    }

    if (requestType === RequestType.PUT) {
      return this.http.put(
        endpointUrl, JSON.stringify(objectToSend),
        { headers: new HttpHeaders().set('Content-Type', 'application/json') })
        .map((response: Response) => this.extractData(response))
        .catch((error: any) => this.handleError(error));
    }

    // Then delete method:
    return this.http.delete(endpointUrl,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

}
