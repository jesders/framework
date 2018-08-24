let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.fastSass('resources/assets/scss/app.scss', 'public_html/assets/css')
   .js('resources/assets/js/app.js', 'public_html/assets/js')
   .browserSync({
       proxy: 'localhost:8099',
       files: [
           'app/**/*',
           'public_html/**/*',
           'resources/views/**/*',
           'resources/templates/**/*',
           'routes/**/*'
    	]
   });

