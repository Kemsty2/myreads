import React from "react";
import PropTypes from "prop-types";

class BookChanger extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      shelf: "none",      
    }
  }

  componentDidMount(){
    const book = this.props.allBooks.filter(book => book.id === this.props.book.id);
    if(book && book.length !== 0){
      this.setState({
        shelf: book[0].shelf
      });
    }
  }

  onChange = (e) => {
    //e.preventDefault();
    
    const shelf = e.target.value;

    console.log({id: this.props.book.id, shelf})
    this.props.updateShelf(this.props.book.id, shelf);   
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={this.onChange} value={this.state.shelf}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookChanger;

BookChanger.propTypes = {
  updateShelf: PropTypes.func,
  book: PropTypes.object,
  allBooks: PropTypes.array
}