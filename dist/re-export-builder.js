var ensure_is_re_export_file_1 = require("./ensure-is-re-export-file");
var path = require("path");
var fs = require("fs");
var utils_1 = require("./utils");
var ReExportBuilder = (function () {
    function ReExportBuilder(globMatches, onFinish) {
        var _this = this;
        this.onFinish = onFinish;
        this.reExportFilePaths = [];
        this.finishedCount = 0;
        this.setGlobMatchesToDirectoryGroups(globMatches);
        this.directoryGroups.forEach(function (group) {
            _this.handleFolderWithFiles(group.directory, group.files);
        });
    }
    ReExportBuilder.createReExportFiles = function (globMatches, onFinish) {
        return new ReExportBuilder(globMatches, onFinish);
    };
    ReExportBuilder.prototype.setGlobMatchesToDirectoryGroups = function (globMatches) {
        var groups = utils_1.groupBy(globMatches, function (item) { return path.dirname(item); });
        this.directoryGroups = groups.map(function (g) { return { directory: g.key, files: g.values }; })
            .sort(function (a, b) { return b.directory.length - a.directory.length; });
        this.directoryGroups.pop();
    };
    ReExportBuilder.prototype.handleFolderWithFiles = function (folderName, files) {
        var _this = this;
        var reExportFilePath = utils_1.toForwardSlashes(path.join(folderName, "..", path.basename(folderName) + ".ts"));
        this.reExportFilePaths.push(reExportFilePath);
        fs.readFile(reExportFilePath, "utf8", function (err, data) {
            _this.handleFileWithData({
                reExportFilePath: reExportFilePath,
                data: data,
                files: files
            });
        });
    };
    ReExportBuilder.prototype.handleFileWithData = function (obj) {
        if (ensure_is_re_export_file_1.ensureIsReExportFile(obj.data)) {
            this.writeReExportFile(obj);
            this.addReExportFileToDirectoryGroups(obj.reExportFilePath);
        }
        else {
            console.warn("Skipping \"" + obj.reExportFilePath + "\". The file did not only contain export statements.");
        }
    };
    ReExportBuilder.prototype.writeReExportFile = function (_a) {
        var _this = this;
        var reExportFilePath = _a.reExportFilePath, files = _a.files;
        fs.writeFile(reExportFilePath, this.getFileTextFromFiles(files), function (err) {
            _this.onFileFinished();
        });
    };
    ReExportBuilder.prototype.getFileTextFromFiles = function (fileNames) {
        return fileNames.map(function (name) { return ("export * from \"./" + (path.basename(path.dirname(name)) + "/" + path.parse(name).name) + "\";"); }).join("\n") + "\n";
    };
    ReExportBuilder.prototype.addReExportFileToDirectoryGroups = function (reExportFilePath) {
        var baseGroup = path.dirname(reExportFilePath);
        var baseGroupIndex = this.directoryGroups.map(function (g) { return g.directory; }).indexOf(baseGroup);
        if (baseGroupIndex >= 0) {
            this.directoryGroups[baseGroupIndex].files.push(reExportFilePath);
        }
    };
    ReExportBuilder.prototype.onFileFinished = function () {
        this.finishedCount++;
        if (this.finishedCount === this.directoryGroups.length && typeof this.onFinish === "function") {
            this.onFinish(this.reExportFilePaths);
        }
    };
    return ReExportBuilder;
})();
exports.ReExportBuilder = ReExportBuilder;

//# sourceMappingURL=re-export-builder.js.map
