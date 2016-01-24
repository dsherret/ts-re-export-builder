var REXPORT_REGEX = /^export \* from ["'][^"']+["'];?$/;
function ensureIsReExportFile(text) {
    var lines = (text || "").split(/\r?\n/);
    return lines.every(function (line) { return REXPORT_REGEX.exec(line.trim()) != null || line.trim().length === 0; });
}
exports.ensureIsReExportFile = ensureIsReExportFile;

//# sourceMappingURL=ensure-is-re-export-file.js.map
