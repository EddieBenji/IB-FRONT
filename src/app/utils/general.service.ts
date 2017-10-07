/**
 * Created by lalo on 15/06/17.
 */

import { Injectable, isDevMode } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RequestType } from './request-type.enum';

@Injectable()
export class GeneralService {
  private static MAX_STRING_LENGTH = 40;
  protected bethelUrl: string;

  public static showFirstNChars(word: string, long?: number) {
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

  public static getStringFromObject(objToDecode) {
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
  }

  constructor(protected http: Http) {
    this.bethelUrl = isDevMode() ? 'http://127.0.0.1:8000' : 'http://74.208.72.187:4500/api';
  }

  protected handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${err.msg} - Código de error: ${err.errorCode}`;
      if (err.errorCode === 409 || err.errorCode === '409') {
        localStorage.clear();
      }
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Observable.throw(errMsg);
  }

  protected extractData(response: Response) {
    return response.json() || {};
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
  public hitUmayaApi(requestType: RequestType, objectToSend: any, endpointUrl: string) {
    // let strToken = '';
    // if (endpointUrl.indexOf('login') < 0 && endpointUrl.indexOf('logout') < 0 && endpointUrl.indexOf('resetpw') < 0
    //   && endpointUrl.indexOf('signin') < 0) {
    //   strToken = 'token=' + localStorage.getItem('accessToken');
    // }

    if (requestType === RequestType.POST) {
      return this.http.post(
        endpointUrl, JSON.stringify(objectToSend), { headers: new Headers({ 'Content-Type': 'application/json' }) }
      )
        .map((response: Response) => this.extractData(response))
        .catch(this.handleError);
    }

    if (requestType === RequestType.GET) {
      const objKeys = Object.keys(objectToSend);
      let queryParams = '?';
      if (objKeys.length > 0) {
        for (const objKey of objKeys) {
          queryParams += objKey + '=' + objectToSend[ objKey ] + '&';
        }
      }
      // if (strToken.length !== 0) {
      //   queryParams += strToken;
      // } else {
        // Remove the last '&':
        queryParams = queryParams.slice(0, -1);
      // }
      return this.http.get(this.bethelUrl + endpointUrl + queryParams)
        .map((response: Response) => this.extractData(response))
        .catch(this.handleError);
    }

    if (requestType === RequestType.PUT) {
      return this.http.put(
        endpointUrl, JSON.stringify(objectToSend), {
          headers: new Headers({ 'Content-Type': 'application/json' })
        })
        .map((response: Response) => this.extractData(response))
        .catch(this.handleError);
    }

    // Then delete method:
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // const urlToHit = this.appendTokenToUrl(endpointUrl, strToken);
    return this.http.delete(endpointUrl, { headers: headers })
      .map((response: Response) => this.extractData(response))
      .catch(this.handleError);
  }

}
