import * as assert from "assert";
import * as path from "path";
import {build} from "./../main";

describe("build", () => {
    build({
        files: path.join(__dirname, "../../src/tests/test-directory") + "/**/*.ts"
    });
});