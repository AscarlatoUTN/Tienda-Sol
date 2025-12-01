
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
   const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);

        let startPage, endPage;

        if (currentPage <= 3) {
            startPage = 2;
            endPage = 5;
        } else if (currentPage >= totalPages - 2) {
            startPage = totalPages - 4;
            endPage = totalPages - 1;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        startPage = Math.max(2, startPage);
        endPage = Math.min(totalPages - 1, endPage);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages - 1) {
            pages.push('...');
        }

        pages.push(totalPages);
    }

    return pages;
    };

    return totalPages === 0 ? null : (
        <div className="pagination">
            <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FaChevronLeft size={20} />
                Anterior
            </button>

            <div className="pagination-numbers">
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                    ) : (
                        <button
                            key={page}
                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Siguiente
                <FaChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;