import React, { Component } from "react";

export default class CompanyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }

    render() {
        return (
            <p>
                company details work!
            </p>
        );
    }
}