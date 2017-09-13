import { IBFRONTPage } from './app.po';

describe('ib-front App', () => {
  let page: IBFRONTPage;

  beforeEach(() => {
    page = new IBFRONTPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
