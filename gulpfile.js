let gulp = require('gulp')
let sass = require('gulp-sass')

// Compiles all bootstrap SASS/SASS files and injects them into the src/css folder
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

// Moves all bootstrap JS dependencies from node_modules to the src/js folder
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest('src/js'));
});

// Receives a task name and a series with all functions/tasks that are executed along with this task
gulp.task('watch', gulp.series(['sass'], function () {
    // Receives the files we want to watch and a series with tasks that are run whenever the watched files are modified
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series('sass'));
}));

gulp.task('default', gulp.series(['js', 'watch']));
