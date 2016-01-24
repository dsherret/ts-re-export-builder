import * as assert from "assert";
import {groupBy} from "./../../utils";

describe("groupBy", () => {
    it("should group by a specified key", () => {
        const a = ["1", "12", "21"];
        assert.deepEqual(groupBy(a, (item) => item.length.toString()), [{ key: "1", values: ["1"] }, { key: "2", values: ["12", "21"] }]);
    });
});
