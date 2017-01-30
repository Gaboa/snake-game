const gulp        = require('gulp');
const rollup      = require('gulp-rollup');
const sourcemaps  = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// process JS files and return the stream.
gulp.task('js', function () {
    gulp.src('./src/**/*.js')
        .pipe(sourcemaps.init())
        // transform the files here.
        .pipe(rollup({
            entry: './src/main.js'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.watch('src/**', function(event) {  
    gulp.run('js-watch');
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['js-watch'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("js/*.js", ['js-watch']);
});