export default function countItemCategories(items) {
    const counts = {};

    if (!items) {
        return counts;
    }

    for (let i = 0; i < items.length; i++) {
        const categoryList = items[i].category_list;
        const seen = new Set();

        if (categoryList) {
            for (let x = 0; x < categoryList.length; x++) {
                const name = categoryList[x] && categoryList[x].categoryName;
                if (!name || seen.has(name)) {
                    continue;
                }
                seen.add(name);
                counts[name] = (counts[name] || 0) + 1;
            }
        } else if (items[i].category) {
            counts[items[i].category] = (counts[items[i].category] || 0) + 1;
        }
    }

    return counts;
}
