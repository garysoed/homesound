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
    return function() {
      compile(file, file);
    };
  });
  return gulp.parallel(fns);
}

gulp.task('compile-tests', compileFiles('./player/*_test.js'));

gulp.task('compile-player', function() {
  return compile('./player/index.js', 'player.js');
});

gulp.task('test', gulp.series(
    'compile-player',
    function _test(done) {
      runKarma(true, done);
    }
));

gulp.task('test-server', gulp.series(
    'compile-player',
    function _test(done) {
      runKarma(false, done);
    }
));

gulp.task('watch', function _watchSources() {
  gulp.watch(['./player/*.js'], gulp.task('compile-player'));
  gulp.watch(['./player/*_test.js', './player/*.js'], gulp.task('compile-tests'));
});
