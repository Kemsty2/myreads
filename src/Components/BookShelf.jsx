import React from "react";
import BookList from "./BookList";
import PropTypes from "prop-types";

class BookShelf extends React.Component {
  render() {
    return (      
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BookList books={this.props.books} isLoading={this.props.isLoading} updateShelf={this.props.updateShelf}/>
        </div>
      </div>
    );
  }
}

export default BookShelf;

BookShelf.propTypes = {
  title: PropTypes.string,
  books: PropTypes.array,
  isLoading: PropTypes.bool,
  updateShelf: PropTypes.func
}