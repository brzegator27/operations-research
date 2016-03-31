var fs = require("fs");
var browserify = require("browserify");
browserify("./js/app.js")
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(fs.createWriteStream("app_browserify_build_2.js"));