import React from "react";
import BookChanger from "./BookChanger";
import PropTypes from "prop-types";

class Book extends React.Component {
  render() {
    const { book, updateShelf } = this.props;
    let thumbnail =
      "";
    
      if (book.imageLinks && book.imageLinks.thumbnail) {
      thumbnail = book.imageLinks.thumbnail;
    }
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${thumbnail})`
            }}
          ></div>
          <BookChanger updateShelf={updateShelf} book={book} allBooks={this.props.allBooks} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

export default Book;

Book.propTypes = {
  book: PropTypes.object,
  updateShelf: PropTypes.func,
  allBooks: PropTypes.array
};
