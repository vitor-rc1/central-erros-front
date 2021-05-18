/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
export const pagenation = (data, size) => {
  const itemsPerPage = size;
  const pages = Math.ceil(data.length / itemsPerPage);
  const result = new Array(pages).fill().map((_data) => data.splice(0, 8));
  return result;
};
