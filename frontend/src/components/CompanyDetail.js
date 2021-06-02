import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class CompanyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: Object
        };
        const id = 1;
        const test = `/api/businesses/${id}`;
    }

    fetchData() {
        const id = this.props.match.params.id;
        axios
            .get(`/api/businesses/${id}`)
            .then((res) => this.setState({ todoList: res.data }))
            .catch((err) => console.log(err));
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <p>{this.state.todoList.name}</p>
                <p>{this.state.todoList.description}</p>
                <p>{this.state.todoList.location}</p>
                <Link to={`/`}>Back</Link>
            </div>
        );
    }
}