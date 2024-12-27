const formatSortToApi = (option: string) => {
  switch (option) {
    case '마감임박순':
      return 'time';
    case '시급많은순':
      return 'pay';
    case '시간적은순':
      return 'hour';
    case '가나다순':
      return 'shop';
    default:
      return 'time';
  }
};

export default formatSortToApi;
