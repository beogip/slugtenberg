/* Happy Coding!
—————————————————————————————————————————————————————————
file:			lib/scripts.js
version: 		0.0.1
last_changes:	.
—————————————————————————————————————————————————————————
*/

// Gulp
const {src,dest} = require('gulp')
const gulpif = require('gulp-if')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const chmod = require('gulp-chmod')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const jshint = require('gulp-jshint')

// Customs
const config = require('./config.js')
const {logfile} = require('./logs.js')

module.exports = (cb) => {
	src([
			'src/slugs/**/*+(' + config.typeScript + ')',
			'src/scripts/**/*+(' + config.typeScript + ')', // ext force to read files only
			'!src/**/_*/',
			'!src/**/_*/**'
		])
		.pipe(logfile('Building script'))
		.pipe(concat('scripts.js'))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulpif(config.debug, uglify())) // compress js output
		.pipe(chmod(0644))
		.pipe(dest(config.outputPath + '/assets'))

	cb();
}