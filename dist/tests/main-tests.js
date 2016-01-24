var path = require("path");
var main_1 = require("./../main");
describe("build", function () {
    main_1.build({
        files: path.join(__dirname, "../../src/tests/test-directory") + "/**/*.ts"
    });
});

//# sourceMappingURL=main-tests.js.map
