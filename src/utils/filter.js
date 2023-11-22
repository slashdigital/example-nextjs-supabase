export const buildQuery = (query, queryOptions, quickFilterFields = []) => {
  queryOptions.filterModel.items.forEach((item, key) => {
    if (!!item.value) {
      switch (item.operator) {
        case "contains":
          query.ilike(item.field, `%${item.value || ""}%`);
          break;
        case "equals":
          query.eq(item.field, item.value);
          break;
        case "startsWith":
          query.ilike(item.field, `${item.value || ""}%`);
          break;
        case "endWith":
          query.ilike(item.field, `%${item.value || ""}`);
          break;
        case "isEmpty":
          query.is(item.field, null);
          break;
        case "isNotEmpty":
          query.not(item.field, "is", null);
          break;
        case "isAnyOf":
          query.contains(item.field, item.value);
          break;
      }
    }
  });
  if (
    queryOptions.filterModel.quickFilterValues.length &&
    queryOptions.filterModel.quickFilterValues.join() != ""
  ) {
    console.log(queryOptions);
    quickFilterFields.forEach((field, key) => {
      query.ilike(
        field,
        `%${queryOptions.filterModel.quickFilterValues.join("") || ""}%`
      );
    });
  }
  return query;
};
