var assert = require("assert");
var utils_1 = require("./../../utils");
describe("groupBy", function () {
    it("should group by a specified key", function () {
        var a = ["1", "12", "21"];
        assert.deepEqual(utils_1.groupBy(a, function (item) { return item.length.toString(); }), [{ key: "1", values: ["1"] }, { key: "2", values: ["12", "21"] }]);
    });
});

//# sourceMappingURL=group-by-tests.js.map
