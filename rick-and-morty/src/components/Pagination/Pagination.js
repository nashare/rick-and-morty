import './Pagination.css';
import { useMemo } from 'react';

function Pagination({ info, page, setPage }) {
  // from https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
  const paginationRange = useMemo(() => {
    const totalPageNumbers = 7;
    const siblingCount = 1;

    function rangeArray (start, end) {
      return Array.from(Array(end - start + 1).keys(), (num) => num + start);
    }
    if (totalPageNumbers >= info.pages) {
      return rangeArray(1, info.pages);
    }
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      page + siblingCount,
      info.pages
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < info.pages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = info.pages;
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = rangeArray(1, leftItemCount);
      return [...leftRange, "DOTS", info.pages];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = rangeArray(
        info.pages - rightItemCount + 1,
        info.pages
      );
      return [firstPageIndex, "DOTS", ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = rangeArray(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
    }
  }, [info, page]);

  const paginationRangeArray = paginationRange;

  const buttons = [];
  for (let i = 0; i < paginationRangeArray.length; i++) {
    if (paginationRangeArray[i]==="DOTS") {
      buttons.push(<p className="pagination-dots">...</p>)
    } else {
      const isCurrentPage = paginationRangeArray[i] === page;
      const buttonClass = isCurrentPage ? 'pagination-button pagination-button-clicked' : 'pagination-button';

      buttons.push(
        <button className={buttonClass} key={paginationRangeArray[i]} onClick={() => setPage(paginationRangeArray[i])}>
          {paginationRangeArray[i]}
        </button>
      );
    }
  }

  function leftArrowClick() {
    if (page > 1)
    setPage(page-1);
  }

  function rightArrowClick() {
    if (page < info.pages)
      setPage(page + 1);
  }


  if (info.pages > 1) {
    return (
      <>
    <div className="pagination-container">
          <i className={`fa-regular fa-circle-left ${page === 1 ? 'inactive' : ''}`} onClick={leftArrowClick}></i>
      {buttons}
          <i className={`fa-regular fa-circle-right ${page === info.pages ? 'inactive' : ''}`} onClick={rightArrowClick}></i>
    </div>
      </>
    );
  }

  return null;
}

export default Pagination;
