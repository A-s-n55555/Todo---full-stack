import React, { Component } from "react"
import Modal from "./components/Model"; 
import axios from "axios";
import "./App.css"; 

class App extends Component {
    state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };

    async componentDidMount() {
      try {
        const res = await fetch('http://localhost:8000/api/todos/');
        const todoList = await res.json();
        this.setState({
          todoList
        });
      } catch (e) {
        console.log(e);
    }
    }

    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };
  
    //Responsible for saving the task
    handleSubmit = item => {
      this.toggle();
      if (item.id) {
        axios
          .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        return;  
      }
      axios
        .post("http://localhost:8000/api/todos/", item)
    };

    createItem = () => {
      const item = {title: "", description: "", completed: false };
      this.setState({ activeItem: item, modal: !this.state.modal });
    };

    displayCompleted = status => {
      if (status) {
        return this.setState({ viewCompleted: true});
      }
      return this.setState({ viewCompleted: false});
    };
    renderTabList = () => {
      return (
        <div className="my-5 tab-list">
          <button 
            onClick={() => this.displayCompleted(true)}
            className={this.state.viewCompleted ? "active" : ""}
          >
            Complete
          </button>
          <button 
            onClick={() => this.displayCompleted(false)}
            className={this.state.viewCompleted ? "" : "active"}
          >
            Incomplete
          </button>
        </div>  
      );
    };


    editItem = item => {
      this.setState({ activeItem: item });
      this.toggle();
    };

    handleDelete = item => {
      axios.delete(`http://localhost:8000/api/todos/${item.id}/`).then(res => {
        this.setState({ todoList: this.state.todoList.filter(i => i.id !== item.id) });
      });
    };
    
    

    renderItems = () => {
      const { viewCompleted } = this.state;
      const newItems = this.state.todoList.filter(
        item => item.completed === viewCompleted
      );

      
      return newItems.map(item => (
        <div 
          key={item.id}
          className="card mb-3"
        >
          <div className="card-body d-flex justify-content-between align-items-center">
          <span 
            className={`todo-title mr-2 ${
              this.state.viewCompleted ? "completed-todo" : ""
            }`}
            title={item.description}
            >
              {item.title}
            </span>
          <div className="d-flex">
          <button className="btn btn-secondary mr-2"
          onClick={() => this.editItem(item)}>
            Edit</button>
          <button className="btn btn-danger"
          onClick={() => this.handleDelete(item)}>
            Delete</button>
          </div>
          </div>
        </div>
      ));
    };

    render() {
      return (
        <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-success">Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ): null}
      </main>
      )
    }
  }
  
export default App;