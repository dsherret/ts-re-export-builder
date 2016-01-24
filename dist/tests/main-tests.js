var assert = require("assert");
var path = require("path");
var fs = require("fs");
var main_1 = require("./../main");
describe("build", function () {
    var reExportFiles;
    before(function (done) {
        main_1.build({
            files: path.join(__dirname, "../../src/tests/test-directory") + "/**/*.ts",
            onFinish: function (files) {
                reExportFiles = files;
                done();
            }
        });
    });
    it("should create three reExportFiles", function () {
        assert.equal(reExportFiles.length, 3);
    });
    it("should have a file called sub-dir2-sub-dir1.ts", function () {
        assert.equal(reExportFiles[0].indexOf("sub-dir2-sub-dir1.ts") > 0, true);
    });
    it("should have a file called sub-dir1.ts", function () {
        assert.equal(reExportFiles[1].indexOf("sub-dir1.ts") > 0, true);
    });
    it("should have a file called sub-dir2.ts", function () {
        assert.equal(reExportFiles[2].indexOf("sub-dir2.ts") > 0, true);
    });
    describe("sub-dir2-sub-dir1.ts", function () {
        it("should have an export statment for the containing file", function (done) {
            fs.readFile(reExportFiles[0], "utf8", function (err, data) {
                assert.equal(data, "export * from \"./sub-dir2-sub-dir1/sub-dir2-sub-dir1-file1\";\n");
                done();
            });
        });
    });
    describe("sub-dir1.ts", function () {
        it("should have an export statment for the containing files", function (done) {
            fs.readFile(reExportFiles[1], "utf8", function (err, data) {
                assert.equal(data, "export * from \"./sub-dir1/sub-dir1-file1\";\nexport * from \"./sub-dir1/sub-dir1-file2\";\nexport * from \"./sub-dir1/sub-dir1-file3\";\n");
                done();
            });
        });
    });
    describe("sub-dir2.ts", function () {
        it("should have an export statment for the containing files", function (done) {
            fs.readFile(reExportFiles[2], "utf8", function (err, data) {
                assert.equal(data, "export * from \"./sub-dir2/sub-dir2-file1\";\nexport * from \"./sub-dir2/sub-dir2-sub-dir1\";\n");
                done();
            });
        });
    });
    after(function () {
        deleteReExportFiles(reExportFiles);
    });
});
function deleteReExportFiles(reExportFiles) {
    reExportFiles.forEach(function (fileName) {
        fs.unlink(fileName);
    });
}

//# sourceMappingURL=main-tests.js.map
