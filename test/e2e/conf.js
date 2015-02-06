/**
 * Created by marianne on 15.01.15.
 */

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  baseUrl: 'http://fancy.flowergarden',
  multiCapabilities: [/*{
    'browserName': 'firefox'
  } ,*/{
    browserName: 'chrome'
  }]
}
