export const getPages = (currentPage: number, totalPages: number) => {
  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages > 5) {
    if (currentPage === 1) {
      return [
        currentPage,
        currentPage + 1,
        currentPage + 2,
        currentPage + 3,
        currentPage + 4,
      ];
    } else if (currentPage === totalPages) {
      return [
        currentPage - 4,
        currentPage - 3,
        currentPage - 2,
        currentPage - 1,
        currentPage,
      ];
    } else if (currentPage === 2) {
      return [
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        currentPage + 3,
      ];
    } else if (currentPage === totalPages - 1) {
      return [
        currentPage - 3,
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ];
    } else {
      return [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
    }
  } else {
    return allPages;
  }
};
