// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    reporters: ['mocha'],
    browsers: ['Chrome'],
    frameworks: ['mocha', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-mocha-reporter'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/ClientApp'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/ClientApp'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    restartOnFileChange: true
  });
};


// module.exports = function (config) {
//   config.set({
//     basePath: '',
//     reporters: ['mocha'],
//     browsers: ['Chrome'],
//     frameworks: ['mocha', '@angular-devkit/build-angular'],
//     plugins: [
//       require('karma-mocha'),
//       require('karma-chai'),
//       require('karma-mocha-reporter'),
//       require('karma-chrome-launcher'),
//       require('karma-coverage-istanbul-reporter'),
//       require('@angular-devkit/build-angular/plugins/karma')
//     ],
//     client: {
//       clearContext: false
//     },
//     coverageIstanbulReporter: {
//       dir: require('path').join(__dirname, './coverage/tsy-clinet-buy'),
//       reports: ['html', 'lcovonly', 'text-summary'],
//       fixWebpackSourcePaths: true
//     },
//     port: 9876,
//     colors: true,
//     logLevel: config.LOG_INFO,
//     autoWatch: true,
//     singleRun: false,
//     restartOnFileChange: true
//   });
// };