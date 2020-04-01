import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";
import Loader from "./Loader";

class BookList extends React.Component {
  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <ol className="books-grid">
        {this.props.books.map((book, idx) => {
          return (
            <li key={idx}>
              <Book book={book} updateShelf={this.props.updateShelf} />
            </li>
          );
        })}
      </ol>
    );
  }
}

export default BookList;

BookList.propTypes = {
  books: PropTypes.array,
  isLoading: PropTypes.bool,
  updateShelf: PropTypes.func
};
