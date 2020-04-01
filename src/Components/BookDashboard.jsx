import React from "react";
import BookShelf from "./BookShelf";
import { getAll, update } from "../BooksAPI";
import Loader from "./Loader";

class BookDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      isLoading: false,
      onUpdating: false
    };
  }

  static get shelves() {
    return [
      { id: "currentlyReading", title: "Currently Reading" },
      { id: "wantToRead", title: "Want To Read" },
      { id: "read", title: "Read" }
    ];
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    getAll()
      .then(books => {
        this.setState({
          books,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
      });
  }

  updateShelf = (idBook, shelf) => {
    console.log({ idBook, shelf });
    this.setState({
      onUpdating: true
    });

    update(idBook, shelf)
      .then(() => {
        this.setState({
          books: this.state.books.map(book => {
            if (book.id === idBook) {
              return Object.assign({}, book, {
                shelf
              });
            }
            return book;
          }),
          onUpdating: false
        });
      })
      .catch(() => {
        this.setState({
          onUpdating: false
        });
      });

    console.log(this.state.books);
  };

  onOpenSearch = () => {
    this.props.history.push("/search");
  };

  getBooks = shelfId => {
    return this.state.books.filter(book => book.shelf === shelfId);
  };

  render() {
    const { isLoading, onUpdating } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {onUpdating ? (
              <div
                style={{ textAlign: "center", height: "calc(100vh - 148px)" }}
              >
                <Loader style={{ marginTop: "calc(50vh - 148px)" }} />{" "}
              </div>
            ) : (
              BookDashboard.shelves.map(shelf => {
                return (
                  <BookShelf
                    key={shelf.id}
                    title={shelf.title}
                    books={this.getBooks(shelf.id)}
                    isLoading={isLoading}
                    updateShelf={this.updateShelf}
                  />
                );
              })
            )}
            {}
          </div>
        </div>
        <div className="open-search">
          <button onClick={this.onOpenSearch} style={{ cursor: "pointer" }}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default BookDashboard;
