var gulp            = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    browserSync     = require('browser-sync').create(),
    plugins         = gulpLoadPlugins(),
    autoprefixerOptions = {
        browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
    },
    proRoot         = '../public_html/assets/',
    nodeRoot        = '../resources/node_modules/',
    sourceRoot      = '../resources/assets/',
    sourceScripts   = sourceRoot+'scripts/',
    // sourceHTML      = sourceRoot+'html/',
    sourceStyles    = sourceRoot+'scss/',
    sourceImg       = sourceRoot+'images/',
    // htmlOptions     = { conditionals: true, spare: true },
    paths           = {
                        /************
                        * JS
                        ************/
                        dev_scripts:
                        [
                            nodeRoot+'jquery/dist/jquery.js',
                            sourceScripts+'lib.js',
                            sourceScripts+'app.js',
                        ],
                        pro_scripts: proRoot+'scripts',
                        /************
                        * CSS
                        ************/
                        dev_css:
                        [
                            sourceStyles+'app.scss'
                        ],
                        pro_css: proRoot+'css'
                      };
                      gulp.task('js', function(){
                          return gulp.src(paths.dev_scripts)
                              .pipe(plugins.concat('master.js'))
                              .pipe(gulp.dest(paths.pro_scripts))
                              .pipe(browserSync.reload({stream: true}));
                              // .pipe(plugins.rename('master.min.js'))
                              // .pipe(plugins.uglify())
                              // .pipe(gulp.dest(paths.pro_scripts));
                      });
                      gulp.task('sass', function(){
                          return gulp.src(paths.dev_css)
                              .pipe(plugins.concat('master.css'))
                              .pipe(plugins.sass())
                              .pipe(plugins.autoprefixer(autoprefixerOptions))
                              .pipe(gulp.dest(paths.pro_css))
                              .pipe(browserSync.reload({stream: true}));
                              // .pipe(plugins.rename('master.min.css'))
                              // .pipe(plugins.cssnano({discardComments: {removeAll: true}}))
                              // .pipe(gulp.dest(paths.pro_css));
                      });
                      gulp.task('serve', function(){
                         browserSync.init({
                             proxy: "localhost:8081",
                         });
                         gulp.watch('../resources/sass/**/*.scss', ['sass']);
                         gulp.watch('../resources/scripts/*.js', ['js']);
                       //   gulp.watch('../ef/resources/views/vendor/sfp/pages/templates/*.php').on('change', browserSync.reload);
                         gulp.watch('../public_html/*.php').on('change', browserSync.reload);
                     });
/************
** These commands are examples of
** laravel html minifications
************/
// gulp.task('includes', function() {
//   return gulp.src(paths.dev_html_includes)
//     .pipe(plugins.htmlmin(htmlOptions))
//     .pipe(gulp.dest(paths.pro_html_includes));
// });
//
// gulp.task('partials', function() {
//   return gulp.src(paths.dev_html_partials)
//     .pipe(plugins.htmlmin(htmlOptions))
//     .pipe(gulp.dest(paths.pro_html_partials));
// });
//
// gulp.task('app', function() {
//   return gulp.src(paths.dev_html_app)
//     .pipe(plugins.htmlmin(htmlOptions))
//     .pipe(plugins.rename('app.blade.php'))
//     .pipe(gulp.dest(paths.pro_html_app));
// });
//
// gulp.task('html', function() {
//     gulp.start('includes', 'partials', 'app');
// });
gulp.task('fonts', function() {
    return gulp.src(paths.dev_fonts)
        .pipe(gulp.dest(paths.pro_fonts));
});
gulp.task('default', function(){
    // gulp.start('js', 'css', 'html', 'fonts');
    gulp.start('js', 'sass', 'serve');
});
gulp.task('watch', function(){
    gulp.watch(paths.dev_css, ['sass']);
    gulp.watch(paths.dev_scripts, ['js']);
    // gulp.watch(paths.dev_html_pages, ['includes']);
    // gulp.watch(paths.dev_html_partials, ['partials']);
    // gulp.watch(paths.dev_html_app, ['app']);
});
