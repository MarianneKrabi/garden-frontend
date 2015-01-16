/**
 * Created by marianne on 15.01.15.
 */

describe('Garden app', function() {
  beforeEach(function () {
    browser.get('http://fancy.flowergarden/');
  });

  describe('general page tests', function () {
    it('should have title Garden', function () {
      expect(browser.getTitle()).toEqual('Garden');
    });

    it('should redirect to /garden', function () {
      expect(browser.getLocationAbsUrl()).toMatch("/garden");

      browser.setLocation('/something');
      expect(browser.getLocationAbsUrl()).toMatch("/garden");
    });

    it('should change views when clicking in navbar', function () {
      var links = element.all(by.css('a'));
      links.get(2).click();
      expect(browser.getLocationAbsUrl()).toMatch("/plant-list");

      links.get(0).click();
      expect(browser.getLocationAbsUrl()).toMatch("/garden");

      links.get(1).click();
      expect(browser.getLocationAbsUrl()).toMatch("/garden");

      links.get(2).click();
      expect(browser.getLocationAbsUrl()).toMatch("/plant-list");

      links.get(1).click();
      expect(browser.getLocationAbsUrl()).toMatch("/garden");
    });
  });

  describe('/garden page test', function() {
    it('should select radio buttons', function() {
      var radioButton = element.all(by.css('input'));
      expect(radioButton.get(0).getAttribute('checked')).toBeTruthy();
      expect(radioButton.get(1).getAttribute('checked')).toBeFalsy();
      expect(radioButton.get(2).getAttribute('checked')).toBeFalsy();

      radioButton.get(1).click();
      expect(radioButton.get(1).getAttribute('checked')).toBeTruthy();
      expect(radioButton.get(0).getAttribute('checked')).toBeFalsy();
      expect(radioButton.get(2).getAttribute('checked')).toBeFalsy();

      radioButton.get(2).click();
      expect(radioButton.get(2).getAttribute('checked')).toBeTruthy();
      expect(radioButton.get(1).getAttribute('checked')).toBeFalsy();
      expect(radioButton.get(0).getAttribute('checked')).toBeFalsy();
    });

    it('should draw 1 Tulip, 1 Flower and 1 Daisy', function() {
      var canvas = element(by.id('canvas'));
      var radioButton = element.all(by.css('input'));

      canvas.click();
      radioButton.get(1).click();
      canvas.click();
      radioButton.get(2).click();
      canvas.click();

      browser.setLocation('/plant-list');
      var plants = element.all(by.repeater('plant in plants'));
      expect(plants.count()).toEqual(3);


      //var plantNames = element(by.repeater('plant in plants').row(0)).element.all(by.css('td')).get(1);
      var plantNames = element.all(by.repeater('plant in plants').column('plant.name'));

      function getNames() {
        return plantNames.map(function(elm) {
          return elm.getText();
        });
      }
      expect(getNames()).toEqual(['Tulip', 'Flower', 'Daisy']);
    });
  });

  describe('/plant-list page test', function () {
    it('should delete plants', function () {
      browser.setLocation('/plant-list');
      var plants = element.all(by.repeater('plant in plants'));
      expect(plants.count()).toEqual(3);

      element.all(by.css('i')).get(0).click();
      expect(plants.count()).toEqual(2);
    });
  });
});

