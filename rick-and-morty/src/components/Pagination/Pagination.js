import './Pagination.css';

function Pagination({ info, setPage }) {
  const buttons = [];
  for (let i = 1; i <= info.pages; i++) {
    buttons.push(
      <button className="pagination-button" key={i} onClick={() => setPage(i)}>
        {i}
      </button>
    );
  }

  if (info.pages > 1) {
    return <div className="pagination-container">{buttons}</div>;
  }

  return null;
}

export default Pagination;
