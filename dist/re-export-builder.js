var ensure_is_re_export_file_1 = require("./ensure-is-re-export-file");
var path = require("path");
var fs = require("fs");
var utils_1 = require("./utils");
var ReExportBuilder = (function () {
    function ReExportBuilder(globMatches, finishedCallback) {
        var _this = this;
        this.finishedCallback = finishedCallback;
        this.finishedCount = 0;
        this.setGlobMatchesToDirectoryGroups(globMatches);
        this.directoryGroups.forEach(function (group) {
            _this.handleFolderWithFiles(group.key, group.values);
        });
    }
    ReExportBuilder.createReExportFiles = function (globMatches, finishCallback) {
        return new ReExportBuilder(globMatches, finishCallback);
    };
    ReExportBuilder.prototype.setGlobMatchesToDirectoryGroups = function (globMatches) {
        var groups = utils_1.groupBy(globMatches, function (item) { return path.dirname(item); });
        var mainParentDirectory = this.getMainParentDirectory(groups);
        this.directoryGroups = groups.filter(function (groups) { return groups.key !== mainParentDirectory; }).sort(function (a, b) { return b.key.length - a.key.length; });
    };
    ReExportBuilder.prototype.getMainParentDirectory = function (groups) {
        var shortestDir = groups.length > 0 ? groups[0].key : "";
        groups.forEach(function (group) {
            if (group.key.length < shortestDir.length) {
                shortestDir = group.key;
            }
        });
        return shortestDir;
    };
    ReExportBuilder.prototype.handleFolderWithFiles = function (folderName, files) {
        var _this = this;
        var reExportFilePath = path.join(folderName, "..", path.basename(folderName) + ".ts");
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
        }
        else {
            console.warn("Skipping \"" + obj.reExportFilePath + "\". The file did not only contain export statements.");
        }
        this.addReExportFileToDirectoryGroups(obj.reExportFilePath);
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
        var baseGroupIndex = this.directoryGroups.map(function (g) { return g.key; }).indexOf(baseGroup);
        if (baseGroupIndex >= 0) {
            this.directoryGroups[baseGroupIndex].values.push(reExportFilePath);
        }
    };
    ReExportBuilder.prototype.onFileFinished = function () {
        this.finishedCount++;
        if (this.finishedCount === this.directoryGroups.length && typeof this.finishedCallback === "function") {
            this.finishedCallback();
        }
    };
    return ReExportBuilder;
})();
exports.ReExportBuilder = ReExportBuilder;

//# sourceMappingURL=re-export-builder.js.map
