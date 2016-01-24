import * as assert from "assert";
import {toForwardSlashes} from "./../../utils";

describe("toForwardSlashes", () => {
    it("should convert slashes to forward slashes", () => {
        assert.equal(toForwardSlashes(`/test\\test/test\\`), `/test/test/test/`);
    });
});
