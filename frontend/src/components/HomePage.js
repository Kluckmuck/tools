import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            searchText: ""
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("/api/businesses/")
            .then((res) => this.setState({ todoList: res.data }))
            .catch((err) => console.log(err));
    };

    renderItems = () => {
        return this.state.todoList.map((item) => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                {item.name}
                <p>{item.description}</p>
                <p>{item.location}</p>
                <Link to={`details/${item.id}`}>Info</Link>
            </li>
        ));
    };

    renderSearch = () => {
        return (
            <input type="text" value={this.state.searchText} onChange={this.handleChange} />
        )
    };

    handleChange(event) {
        this.setState({ searchText: event.target.value });
    }

    handleSearch() {
        axios
            .get("/api/businesses/?search=" + this.state.searchText)
            .then((res) => this.setState({ todoList: res.data }))
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <main className="container">
                <h1 className="text-white text-uppercase text-center my-4">Var är min pump?</h1>
                {this.renderSearch()}
                <div className="row">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <div className="mb-4">
                                <button onClick={this.handleSearch}
                                    className="btn btn-primary"
                                >
                                    Search
                                </button>
                            </div>
                            <ul className="list-group list-group-flush border-top-0">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default HomePage;