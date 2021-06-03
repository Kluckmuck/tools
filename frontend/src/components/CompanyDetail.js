import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class CompanyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: {},
            date: null
        };
        this.onDateChange = this.onDateChange.bind(this);
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

    calendar() {
        return (
            <div>
                <SingleDatePicker
                    date={this.state.date} // momentPropTypes.momentObj or null
                    onDateChange={date => this.setState({ date })}
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id="your_unique_id" // PropTypes.string.isRequired,
                />
            </div>
        );
    };

    onDateChange(date) {
        console.log(this.state.date);
        console.log(date);
    }

    render() {
        return (
            <div>
                <p>{this.state.todoList.name}</p>
                <p>{this.state.todoList.description}</p>
                <p>{this.state.todoList.location}</p>
                <Link to={`/`}>Back</Link>
                {this.calendar()}
            </div>
        );
    }
}