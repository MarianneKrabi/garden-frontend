/**
 * Created by marianne on 15.01.15.
 */

describe('Garden app', function () {

  var numStartPlants, plants;

  beforeEach(function () {
    browser.get('/');

    browser.setLocation('/plant-list');
    plants = element.all(by.repeater('plant in plants'));
    plants.count().then(function (elems) {
      numStartPlants = elems;
    });
    browser.setLocation('/garden');
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

  describe('/garden page test', function () {
    it('should select radio buttons', function () {
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

    it('should draw three more plants', function () {

      var canvas = element(by.id('canvas'));
      var radioButton = element.all(by.css('input'));

      canvas.click();
      radioButton.get(1).click();
      canvas.click();
      radioButton.get(2).click();
      canvas.click();

      browser.setLocation('/plant-list');
      expect(plants.count()).toEqual(numStartPlants + 3);

    });
  });

  describe('/plant-list page test', function () {
    beforeEach(function() {
      browser.setLocation('/plant-list');
    });
    it('should delete plants', function () {
      element.all(by.css('i')).get(0).click();
      expect(plants.count()).toEqual(numStartPlants - 1);
    });

    it('should search for Tulips', function () {
      var plantNames = element.all(by.repeater('plant in plants').column('plant.name'));

      var plantNameArray = plantNames.map(function (elm) {
        return elm.getText();
      });

      var numTulips = 0;
      for (var i = 0; i < numStartPlants; ++i) {
        if (plantNameArray[i] == 'Tulip') {
          numTulips++;
        }
      }

      var searchField = element(by.css('input'));
      searchField.sendKeys('Tulip');

      element(by.buttonText('Search')).click();
      expect(plants.count()).toEqual(numTulips);
    });

    it('should clear search', function () {
      var searchField = element(by.css('input'));
      searchField.sendKeys('Tulip');
      element(by.buttonText('Search')).click();

      element(by.buttonText('Clear')).click();

      expect(plants.count()).toEqual(numStartPlants);
    });
  });

});

