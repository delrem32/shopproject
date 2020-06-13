import { ShopprojectPage } from './app.po';

describe('shopproject App', function() {
  let page: ShopprojectPage;

  beforeEach(() => {
    page = new ShopprojectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
