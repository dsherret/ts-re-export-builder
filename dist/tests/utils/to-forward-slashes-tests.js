var assert = require("assert");
var utils_1 = require("./../../utils");
describe("toForwardSlashes", function () {
    it("should convert slashes to forward slashes", function () {
        assert.equal(utils_1.toForwardSlashes("/test\\test/test\\"), "/test/test/test/");
    });
});

//# sourceMappingURL=to-forward-slashes-tests.js.map
