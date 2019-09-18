import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
import './App.css'
//import uuid from 'uuid'
import Axios from 'axios'
class App extends Component {
  state = {
    todos: []
  }

  componentDidMount(){
    Axios.get('http://127.0.0.1:5000/todo')
      .then(res => this.setState({todos: res.data}));
  }
  //Alterna o completed
  markComplete = (id) => {
        this.setState({todos: this.state.todos.map(todo => {
          if(todo.id === id){
            todo.completed = !todo.completed
          }
          return todo;
        })})
  }
  //Deletar tarefa
  delTodo = (id) => {
    Axios.delete(`http://127.0.0.1:5000/todo${id}`)
    .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]})
    )

  }
  addTodo = (title) => {
    Axios.post('http://127.0.0.1:5000/add', {
      title,
      completed:false
    }).then(res => this.setState({
    
      todos: [...this.state.todos, res.data]
    }));
    
    
  }
  render() {
    return(
      <Router>
      
          <div className='App'>
            <div className='container'>
              <Header />
              <Route exact path='/' render= {props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo}/>
                  <Todos todos={this.state.todos} 
                  markComplete={this.markComplete}
                  delTodo={this.delTodo} />
                </React.Fragment>
              )}/>
              <Route path='/about' component={About}/>
             
            </div>
          </div>
        </Router>
    );
  }
}
export default App;