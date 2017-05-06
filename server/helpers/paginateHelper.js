/**
  * Controller's' helper
  */
const Helper = {
  /**
   * Pagination
   * @param {Object} condition pagination condition
   * @returns {Object} return an object
   */
  pagination(condition) {
    const next = Math.ceil(condition.count / condition.limit);
    const currentPage = Math.floor((condition.offset / condition.limit) + 1);
    const pageSize = condition.limit > condition.count
      ? condition.count : condition.limit;
    return {
      pageCount: next,
      currentPage,
      pageSize: Number(pageSize),
      totalCount: condition.count
    };
  },
};

export default Helper;
