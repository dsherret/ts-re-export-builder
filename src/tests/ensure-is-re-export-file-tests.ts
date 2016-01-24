import * as assert from "assert";
import {ensureIsReExportFile} from "./../ensure-is-re-export-file";

describe("ensureIsReExportFile", () => {
    it("should return true for an empty file", () => {
        assert.equal(ensureIsReExportFile(""), true);
    });

    it("should return true when passing in null", () => {
        assert.equal(ensureIsReExportFile(null), true);
    });

    it("should return true for empty text", () => {
        assert.equal(ensureIsReExportFile("   \r\n    \n    \r\n\r\n"), true);
    });

    it("should return true for a match", () => {
        assert.equal(ensureIsReExportFile("export * from 'some file';"), true);
    });

    it("should return true for a match on multiple lines in different formats", () => {
        assert.equal(ensureIsReExportFile(`export * from 'some file';\nexport * from "other file";\r\nexport * from "./test/next-tests";`), true);
    });

    it("should return true for a missing comma", () => {
        assert.equal(ensureIsReExportFile(`export * from 'some file'`), true);
    });

    it("should return true for a carriage return line feed at the end", () => {
        assert.equal(ensureIsReExportFile(`export * from 'some file'\r\n`), true);
    });

    it("should return true for a line feed at the end", () => {
        assert.equal(ensureIsReExportFile(`export * from 'some file'\n`), true);
    });

    it("should return false for something that doesn't contain re-export statements", () => {
        assert.equal(ensureIsReExportFile("some random text"), false);
    });

    it("should return false when just one line doesn't match", () => {
        assert.equal(ensureIsReExportFile("export * from 'some file';\r\nsome random text"), false);
    });
});
