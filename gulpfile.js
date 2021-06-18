/* jshint strict: global, node: true */
"use strict";

const { src, dest, lastRun, series, parallel, watch } = require("gulp");
let gulpEsbuild = require("gulp-esbuild");
const pug = require("gulp-pug");
const sourcemaps = require("gulp-sourcemaps");
const connect = require("gulp-connect");
const gulpif = require("gulp-if");
const changed = require("gulp-changed");
const touch = require("gulp-touch-fd");
const minifyCss = require("gulp-clean-css");
const progeny = require("gulp-progeny");
const filter = require("gulp-filter");
const stylus = require("gulp-stylus");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
// TODO: add in memory fs for builds (or custom dist path)
// TODO: add the "test" npm script (eslint, html-validator, [csslint])

const CONFIG = {
  assetsSrc: "src/assets/**/*.*",
  assetsDist: "dist",
  templatesDist: "dist",
  scriptsSrc: "src/scripts/*.js",
  scriptsWatch: "src/scripts",
  scriptsDist: "dist/js",
  stylesSrc: "src/styles/**/*.styl",
  stylesMainFilesFilter: ["**/*.styl", "!**/includes/**/*.styl"],
  stylesWatch: "src/styles",
  stylesDist: "dist/css",
};

{
  const argv = require("yargs").alias({
    e: "env",
  }).argv;
  CONFIG.env = argv.env || "dev";
  Object.freeze(CONFIG);
}

const IS_DEV_MODE = CONFIG.env === "dev";
const IS_PROD_MODE = CONFIG.env === "prod";

function setEsBuildToIncrementalMode(done) {
  gulpEsbuild = gulpEsbuild.createGulpEsbuild({ incremental: true });
  done();
}

function scripts() {
  return src(CONFIG.scriptsSrc)
    .pipe(
      gulpEsbuild({
        sourcemap: IS_DEV_MODE ? "inline" : false,
        define: { __DEBUG__: IS_DEV_MODE },
        minifyWhitespace: true,
        // TODO: use es-modules or single file bundles instead of vendors bundles with global variables
        // minifyIdentifiers: IS_PROD_MODE,
        minifySyntax: IS_PROD_MODE,
        target: ["es2019"],
        bundle: true,
        format: "esm",
      })
    )
    .pipe(changed(CONFIG.scriptsDist, { hasChanged: changed.compareContents }))
    .pipe(dest(CONFIG.scriptsDist))
    .pipe(connect.reload());
}

function templates() {
  return src(["src/templates/**/*.pug"], {
    since: lastRun(templates),
  })
    .pipe(progeny())
    .pipe(
      filter([
        "src/templates/**/*.pug",
        "!src/templates/layouts/*.pug",
        "!src/templates/includes/**/*.pug",
      ])
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(changed(CONFIG.templatesDist, { hasChanged: changed.compareContents }))
    .pipe(dest(CONFIG.templatesDist))
    .pipe(gulpif(IS_PROD_MODE, touch()))
    .pipe(connect.reload());
}

function styles() {
  return src(CONFIG.stylesSrc, { since: lastRun(styles) })
    .pipe(progeny())
    .pipe(filter(CONFIG.stylesMainFilesFilter))
    .pipe(gulpif(IS_DEV_MODE, sourcemaps.init()))
    .pipe(
      stylus({
        compress: true,
        "include css": true,
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(gulpif(IS_DEV_MODE, sourcemaps.write()))
    .pipe(
      gulpif(
        IS_PROD_MODE,
        minifyCss({
          level: {
            1: {
              all: true,
              specialComments: false,
            },
            2: {
              all: true,
            },
          },
        })
      )
    )
    .pipe(changed(CONFIG.stylesDist, { hasChanged: changed.compareContents }))
    .pipe(dest(CONFIG.stylesDist))
    .pipe(gulpif(IS_PROD_MODE, touch()))
    .pipe(connect.reload());
}

function assets() {
  return src(CONFIG.assetsSrc, { since: lastRun(assets) })
    .pipe(changed(CONFIG.assetsDist, { hasChanged: changed.compareContents }))
    .pipe(dest("dist"))
    .pipe(gulpif(IS_PROD_MODE, touch()))
    .pipe(connect.reload());
}

function validateHtml() {
  const validator = require("gulp-html");
  return src(`${CONFIG.templatesDist}/*.html`).pipe(validator());
}

function serve() {
  connect.server({
    root: "dist",
    livereload: true,
  });
}

function watchForChanges() {
  watch(["./src/templates"], templates);
  watch([CONFIG.stylesWatch], styles);
  watch([CONFIG.scriptsWatch], scripts);
  watch(CONFIG.assetsSrc, assets);
}

function imagemin() {
  const imagemin = require("gulp-imagemin");
  return src(CONFIG.assetsSrc).pipe(imagemin()).pipe(dest("src/assets"));
}

exports.build = parallel(templates, styles, scripts, assets);
exports.dev = series(setEsBuildToIncrementalMode, exports.build, parallel(serve, watchForChanges));
exports.validate = series(templates, validateHtml);
exports.imagemin = imagemin;

