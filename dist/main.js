var glob = require("glob");
var re_export_builder_1 = require("./re-export-builder");
function build(_a) {
    var files = _a.files;
    glob(files, function (err, matches) {
        if (err) {
            throw err;
        }
        re_export_builder_1.ReExportBuilder.createReExportFiles(matches);
    });
}
exports.build = build;

//# sourceMappingURL=main.js.map
