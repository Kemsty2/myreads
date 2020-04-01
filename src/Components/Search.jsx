import React from "react";
import BookList from "./BookList";
import { search, update } from "../BooksAPI";
import * as _ from "lodash";
import Loader from "./Loader";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      isLoading: false,
      searchTearm: "",
      message: "Start Searching For New Book"
    };

    this.onChangeDebounce = _.debounce(value => this.onChange(value), 500);
  }

  onChange = query => {
    console.log(query);
    this.setState({
      searchTearm: query
    });

    //  Handle text query empty
    if (query.trim().length === 0) {
      this.clearSearchResults();
      return;
    }

    this.setState({
      isLoading: true,
      message: ""
    });

    //  Get the result and set the state
    search(query)
      .then(books => {
        console.log(books);
        if (Array.isArray(books)) {
          this.setState({
            books,
            isLoading: false
          });          
        } else {
          this.setState({
            books: books.items,
            isLoading: false,
            message: "Result Not Found"
          });
        }
      })
      .catch(() => {
        this.clearSearchResults();  
        this.setState({
          message: "An Error Occurred"
        })      
      });
  };

  onCloseSearch = () => {
    this.props.history.push("/");
  };

  updateShelf = (idBook, shelf) => {
    console.log({ idBook, shelf });

    update(idBook, shelf).then(() => {
      this.setState({
        books: this.state.books.map(book => {
          if (book.id === idBook) {
            return Object.assign({}, book, {
              shelf
            });
          }
          return book;
        })
      });
    });
  };

  clearSearchResults = () => {
    this.setState({ books: [], message: "Start Searching For New Book" });
  };

  render() {
    const { books, isLoading, message } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={this.onCloseSearch}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={({ target: { value } }) => this.onChangeDebounce(value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Loader />
            </div>
          ) : message.length !== 0 ? (
            <div className="search-not-found"> <span className="search-text"> {message} </span></div>
          ) : (
            <BookList books={books} updateShelf={this.updateShelf} />
          )}
        </div>
      </div>
    );
  }
}

export default Search;
