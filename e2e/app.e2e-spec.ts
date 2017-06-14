import { TechDayProjectPage } from './app.po';

describe('tech-day-project App', () => {
  let page: TechDayProjectPage;

  beforeEach(() => {
    page = new TechDayProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
