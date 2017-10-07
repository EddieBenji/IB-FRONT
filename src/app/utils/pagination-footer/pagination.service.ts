import { EventEmitter, Injectable } from '@angular/core';
import { PagingObject } from './paging-object.model';

@Injectable()
export class PaginationService {
  public paginationListener = new EventEmitter<PagingObject>();
  public paginationEmitter = new EventEmitter<PagingObject>();

  constructor() {
  }

  public showPaginationFooter(pagingObj: PagingObject) {
    this.paginationListener.emit(pagingObj);
  }

  public emitSelectedPage(pagingObj: PagingObject) {
    this.paginationEmitter.emit(pagingObj);
  }

}
