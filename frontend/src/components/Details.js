import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

function Details() {
    const [company, setCompany] = useState(Object);
    const [date, setDate] = useState();
    const [focused, setFocus] = useState();

    React.useEffect(() => {
        // fetchData();
        const id = 1;
        axios
            .get(`/api/businesses/${id}`)
            // .then((res) => this.setCompany({ company: res.data }))
            .then(data => {
                setCompany(data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <p>{company.name}</p>
            <p>{company.description}</p>
            <p>{company.location}</p>
            <Calendar date={date} focused={focused} setDate={setDate} setFocus={setFocus}/>
            <Link to={`/`}>Back</Link>
        </div>
    )
};

function Calendar({ date, focused, setDate, setFocus}) {
    return (
        <div>
            <SingleDatePicker
                date={date}
                onDateChange={(date) => {
                    setDate(date)
                    console.log(date)}
                }
                focused={focused}
                onFocusChange={({ focused }) => setFocus(focused)}
                id="date"
            />
        </div>
    );
};
export default Details;