import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Components/Search'
import BookDashboard from './Components/BookDashboard'
import NotFound from "./Components/NotFound"
import { Switch, Route } from 'react-router-dom'

class BooksApp extends React.Component {  

  render() {
    return (
      <div className="app">                
          <Switch>
            <Route exact path='/' component={BookDashboard}/>
            <Route exact path='/search' component={Search}/>
            <Route component={NotFound} />
          </Switch>
      </div>
    )
  }
}

export default BooksApp
