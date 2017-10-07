/**
 * Created by lalo on 22/06/17.
 */

export class PagingObject {
  constructor(public numberOfRows = 0,
              public total_pages = 0,
              public selectedPage = 1,
              public offset = 1,
              public sectionId = 'roles') {
  }
}
