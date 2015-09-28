var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var glob = require('glob');
var karma = require('karma').Server;
var source = require('vinyl-source-stream');
var minimist = require('minimist');
var path = require('path');

function runKarma(singleRun, callback) {
  var options = minimist(process.argv.slice(2), {
    'string': 'tests',
    'default': {
      'tests': '.'
    }
  });

  var config = path.join(__dirname, options.tests, 'karma.conf.js');

  console.log('Karma configs: ' + config);

  var server = new karma({
    configFile: config,
    singleRun: singleRun
  }, callback);
  server.start();
}

function compile(entry, outFile) {
  return browserify({
        entries: entry,
        debug: true
      })
      .transform(babelify)
      .bundle()
      .pipe(source(outFile))
      .pipe(gulp.dest('./out'));
}

function compileFiles(entries) {
  var files = glob.sync(entries);
  var fns = files.map(function(file) {
    var fn = function() {
      return compile(file, file);
    };
    fn.displayName = file;
    return fn;
  });
  return gulp.parallel(fns);
}

gulp.task('compile-tests', compileFiles('./src/**/*_test.js'));

gulp.task('compile-app', gulp.series(
  function _compileJs() {
    return compile('./src/app.js', 'app.js');
  },
  function _copyStatics() {
    return gulp.src(['src/app.html', 'src/player/*.mp3', 'src/**/*.ng'], { base: 'src' })
        .pipe(gulp.dest('out'));
  }));

gulp.task('test', gulp.series(
    gulp.task('compile-tests'),
    function _test(done) {
      runKarma(true, done);
    }
));

gulp.task('test-server', gulp.series(
    gulp.task('compile-tests'),
    function _test(done) {
      runKarma(false, done);
    }
));

gulp.task('watch', gulp.series(
  'compile-app',
  'compile-tests',
  function _watchSources() {
    gulp.watch(['./src/**'], gulp.task('compile-app'));
    gulp.watch(['./src/**/*_test.js', './src/**/*.js'], gulp.task('compile-tests'));
  }));
