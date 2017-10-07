import { Component, OnInit } from '@angular/core';
import { PagingObject } from './paging-object.model';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination-footer',
  templateUrl: './pagination-footer.component.html',
  styleUrls: [ './pagination-footer.component.css' ]
})
export class PaginationFooterComponent implements OnInit {
  public pagingObject: PagingObject = null;
  public ROWS_PER_PAGE = 10;

  constructor(private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.paginationService.paginationListener.subscribe((pagingObj: PagingObject) =>
      this.pagingObject = pagingObj
    );
  }

  selectPage(page: number) {
    if (page > this.pagingObject.total_pages || page < 1) {
      return;
    }
    this.pagingObject.selectedPage = page;
    this.pagingObject.offset = page;
    this.paginationService.emitSelectedPage(this.pagingObject);
    return false;
  }

  selectLastPage() {
    if (this.pagingObject.total_pages === this.pagingObject.selectedPage) {
      return;
    }
    this.pagingObject.selectedPage = Math.ceil(this.pagingObject.numberOfRows / this.ROWS_PER_PAGE);
    this.pagingObject.offset = this.pagingObject.selectedPage;
    this.paginationService.emitSelectedPage(this.pagingObject);
  }

  selectFirstPage() {
    if (this.pagingObject.selectedPage === 1) {
      return;
    }
    this.pagingObject.offset = 0;
    this.pagingObject.selectedPage = 1;
    this.paginationService.emitSelectedPage(this.pagingObject);
  }

  existsMoreThanOnePage() {
    return this.pagingObject.numberOfRows > 1;
  }

  showNextOrPreviousIcon() {
    return this.pagingObject.numberOfRows > 5;
  }

  getFivePagesOrLess() {
    if (this.pagingObject.total_pages > 5) {
      return 5;
    }
    return this.pagingObject.total_pages;
  }
}
