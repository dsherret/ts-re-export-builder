var assert = require("assert");
var ensure_is_re_export_file_1 = require("./../ensure-is-re-export-file");
describe("ensureIsReExportFile", function () {
    it("should return true for an empty file", function () {
        assert.equal(ensure_is_re_export_file_1.ensureIsReExportFile(""), true);
    });
    it("should return true when passing in null", function () {
        assert.equal(ensure_is_re_export_file_1.ensureIsReExportFile(null), true);
    });
    it("should return true for empty text", function () {
        assert.equal(ensure_is_re_export_file_1.ensureIsReExportFile("   \r\n    \n    \r\n\r\n"), true);
    });
    it("should return true for a match with single quotes", function () {
        assert.equal(ensure_is_re_export_file_1.ensureIsReExportFile("export * from 'some file';"), true);
    });
    it("should return true for a match with double quotes", function () {
        assert.equal(ensure_is_re_export_file_1.ensureIsReExportFile('export * from "some file";'), true);
    });
    it("should return true for a match on multiple lines in different formats", function () {
        assert.equal(ensure_is_re_export_file_1.ensureIsReExportFile("export * from 'some file';\nexport * from \"other file\";\r\nexport * from \"./test/next-tests\";"), true);
    });
    it("should return true for a missing comma", function () {
        assert.equal(ensure_is_re_export_file_1.ensureIsReExportFile("export * from 'some file'"), true);
    });
    it("should return true for a carriage return line feed at the end", function () {
        assert.equal(ensure_is_re_export_file_1.ensureIsReExportFile("export * from 'some file'\r\n"), true);
    });
    it("should return true for a line feed at the end", function () {
        assert.equal(ensure_is_re_export_file_1.ensureIsReExportFile("export * from 'some file'\n"), true);
    });
    it("should return false for something that doesn't contain re-export statements", function () {
        assert.equal(ensure_is_re_export_file_1.ensureIsReExportFile("some random text"), false);
    });
    it("should return false when just one line doesn't match", function () {
        assert.equal(ensure_is_re_export_file_1.ensureIsReExportFile("export * from 'some file';\r\nsome random text"), false);
    });
});

//# sourceMappingURL=ensure-is-re-export-file-tests.js.map
