import React from "react";
import PropTypes from "prop-types";

class BookChanger extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      shelf: "move"
    }
  }

  componentDidMount(){
    this.setState({
      shelf: this.props.book.shelf
    })
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
  book: PropTypes.object
}