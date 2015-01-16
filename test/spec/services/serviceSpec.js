/**
 * Created by marianne on 14.01.15.
 */

describe('Service: Garden.services', function () {
  var Plant, $httpBackend;

  beforeEach(module('Garden'));

  beforeEach(inject(function ($injector) {
    Plant = $injector.get('Plant');
    $httpBackend = $injector.get('$httpBackend');
  }));

  it('should init the factory', function () {
    expect(Plant).toBeDefined();
  });

  it('should call http GET when calling query()', function () {
    $httpBackend.expectGET('http://fancy.flowergarden/garden/plant').respond([{plantName: 'Tulip'}]);
    var plants = Plant.query();
    $httpBackend.flush();

    expect(plants[0].plantName).toEqual('Tulip');
  });

  it('should call http DELETE when calling delete()', function () {
    $httpBackend.expectDELETE('http://fancy.flowergarden/garden/plant').respond({plantName: 'Tulip'});
    var deletedPlant = Plant.delete();
    $httpBackend.flush();

    expect(deletedPlant.plantName).toEqual('Tulip');
  });

  it('should call http POST when calling save()', function () {
    $httpBackend.expectPOST('http://fancy.flowergarden/garden/plant', {}).respond(201, '');
    Plant.save({});
    $httpBackend.flush();
  });
});
