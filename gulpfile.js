let gulp = require("gulp");
let sass = require("gulp-sass");
let babel = require("gulp-babel");
let uglify = require("gulp-uglify");
let cleanCss = require("gulp-clean-css");

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
            .pipe(gulp.dest("./dist/js"))
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
        return gulp.watch(["./src/scss/**/*.scss", "./src/js/index.js"], gulp.series("devSass", "devJs"))
    })
    //
gulp.task("default", gulp.series("devSass", "devJs", "browser-sync", "watching"))
    //上线任务
    //压缩js css
gulp.task("cutCss", () => {
    return gulp.src("./src/css/index.css")
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css'));
})
gulp.task("cutJs", () => {
    return gulp.src("./dist/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
})