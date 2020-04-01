import React from "react";
import {Link} from "react-router-dom";

class NotFound extends React.Component {
    render(){
        return(
          <div className="container">
            <p className="notfound-404">404</p>
            <p className="notfound-text">Page Not Found</p>
            
            <Link to="/" className="btn btn-backhome">Back To Home</Link>
          </div>
        );
    }
}

export default NotFound;