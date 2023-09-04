const getpagesCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

export default getpagesCount;
