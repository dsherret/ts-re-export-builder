export function groupBy<T>(a: T[], groupByKey: (item: T) => string) {
    const groups: { [key: string]: T[] } = {};

    a.forEach((item) => {
        const key = groupByKey(item);

        if (groups[key] == null) {
            groups[key] = [];
        }

        groups[key].push(item);
    });

    return Object.keys(groups).map(function(key) {
        return {
            key: key,
            values: groups[key]
        };
    });
};
