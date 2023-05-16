import './Pagination.css';

function Pagination({ info, setPage }) {
  const buttons = [];
  for (let i = 1; i <= info.pages; i++) {
    buttons.push(
      <button key={i} onClick={() => setPage(i)}>
        {i}
      </button>
    );
  }

  return <div className="pagination-container">{buttons}</div>;
}

export default Pagination;
