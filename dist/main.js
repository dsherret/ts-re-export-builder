var glob = require("glob");
var re_export_builder_1 = require("./re-export-builder");
function build(_a) {
    var files = _a.files, onFinish = _a.onFinish;
    glob(files, function (err, matches) {
        re_export_builder_1.ReExportBuilder.createReExportFiles(matches, onFinish);
    });
}
exports.build = build;

//# sourceMappingURL=main.js.map
