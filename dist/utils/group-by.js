function groupBy(a, groupByKey) {
    var groups = {};
    a.forEach(function (item) {
        var key = groupByKey(item);
        if (groups[key] == null) {
            groups[key] = [];
        }
        groups[key].push(item);
    });
    return Object.keys(groups).map(function (key) {
        return {
            key: key,
            values: groups[key]
        };
    });
}
exports.groupBy = groupBy;
;

//# sourceMappingURL=group-by.js.map
