import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import {build} from "./../main";

describe("build", () => {
    let reExportFiles: string[];
    before((done) => {
        build({
            files: path.join(__dirname, "../../src/tests/test-directory") + "/**/*.ts",
            onFinish: (files) => {
                reExportFiles = files;

                done();
            }
        });
    });

    it("should create three reExportFiles", () => {
        assert.equal(reExportFiles.length, 3);
    });

    it("should have a file called sub-dir2-sub-dir1.ts", () => {
        assert.equal(reExportFiles[0].indexOf("sub-dir2-sub-dir1.ts") > 0, true);
    });

    it("should have a file called sub-dir1.ts", () => {
        assert.equal(reExportFiles[1].indexOf("sub-dir1.ts") > 0, true);
    });

    it("should have a file called sub-dir2.ts", () => {
        assert.equal(reExportFiles[2].indexOf("sub-dir2.ts") > 0, true);
    });

    describe("sub-dir2-sub-dir1.ts", () => {
        it("should have an export statment for the containing file", (done) => {
            fs.readFile(reExportFiles[0], "utf8", (err, data) => {
                assert.equal(data, `export * from "./sub-dir2-sub-dir1/sub-dir2-sub-dir1-file1";\n`);
                done();
            });
        });
    });

    describe("sub-dir1.ts", () => {
        it("should have an export statment for the containing files", (done) => {
            fs.readFile(reExportFiles[1], "utf8", (err, data) => {
                assert.equal(data, `export * from "./sub-dir1/sub-dir1-file1";\nexport * from "./sub-dir1/sub-dir1-file2";\nexport * from "./sub-dir1/sub-dir1-file3";\n`);
                done();
            });
        });
    });

    describe("sub-dir2.ts", () => {
        it("should have an export statment for the containing files", (done) => {
            fs.readFile(reExportFiles[2], "utf8", (err, data) => {
                assert.equal(data, `export * from "./sub-dir2/sub-dir2-file1";\nexport * from "./sub-dir2/sub-dir2-sub-dir1";\n`);
                done();
            });
        });
    });

    after(() => {
        deleteReExportFiles(reExportFiles);
    });
});

function deleteReExportFiles(reExportFiles: string[]) {
    reExportFiles.forEach(fileName => {
        fs.unlink(fileName);
    });
}
