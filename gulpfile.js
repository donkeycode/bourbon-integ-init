var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var modRewrite  = require('connect-modrewrite');
var reload      = browserSync.reload;
var del         = require('del');

var clean = function clean(what) {
    var taskName = 'clean:' + what;

    gulp.task(taskName, function(done) {
        del('www/' + what, done);
    });

    return taskName;
};

gulp.task('scss', function () {
    gulp.src(['src/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('www/css'));
});


gulp.task('html', function() {
    gulp.src(['src/*.html', 'src/*.json'])
        .pipe(gulp.dest('www'));
});

gulp.task('img', function() {
    gulp.src('src/img/*')
        .pipe(gulp.dest('www/img'));
});

gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('www/js'));
});;

gulp.task('fonts', function() {
    gulp.src(['src/fonts/*/**'])
        .pipe(gulp.dest('www/fonts'));
});

gulp.task('scripts', function() {
    gulp.src(['bower_components/**/*.js'])
        .pipe(gulp.dest('www/lib'));
});

gulp.task('css-lib', function() {
    gulp.src(['bower_components/**/*.css'])
        .pipe(gulp.dest('www/css'));
});

gulp.task('build', ['scss', 'css-lib', 'scripts', 'html', 'img', 'js', 'fonts']);

gulp.task('serve', ['build'], function() {
    browserSync({
        server: {
            baseDir: 'www',
            middleware: [
            ]
        },
        online: false,
        scriptPath: function (path, port, options) {
            return options.get('absolute');
        },
        snippetOptions: {
            rule: { match: /<\/head>/i }
        }
    });
});

gulp.task('dev', ['build', 'serve'], function() {
    gulp.watch('src/scss/**/*.scss', ['scss', reload]);
    gulp.watch('src/*.html', ['html', reload]);
    gulp.watch('src/img/**', ['img', reload]);
    gulp.watch('src/js/**', ['js', reload]);
});
