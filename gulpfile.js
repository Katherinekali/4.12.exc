let gulp = require("gulp");
let sass = require("gulp-sass");
let babel = require("gulp-babel");

let server = require("browser-sync");
//编译sass
gulp.task("devSass", () => {
        return gulp.src("./src/scss/**/*.scss")
            .pipe(sass())
            .pipe(gulp.dest("./src/css"))
    })
    //js
gulp.task("devJs", () => {
        return gulp.src("./src/js/index.js")
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(gulp.dest("./dist"))
    })
    //起服务
gulp.task("browser-sync", () => {
        server.init({
            server: {
                baseDir: "./src",
                port: 8888
            }
        })
    })
    //监听 
gulp.task("watching", () => {
        return gulp.watch(["./src/scss/**/*.scss", "./src/js/index.js"], gulp.series(["devSass", "devJs"]))
    })
    //
gulp.task("default", gulp.series("devSass", "devJs", "browser-sync", "watching"))