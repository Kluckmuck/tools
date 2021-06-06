import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import momentPropTypes from 'react-moment-proptypes';

function Details() {
    const [company, setCompany] = useState(Object);
    const [date, setDate] = useState();
    const [focused, setFocus] = useState();

    React.useEffect(() => {
        const id = 1;
        axios
        .get(`/api/businesses/${id}`)
        .then(data => {
            setCompany(data.data);
        })
        .catch((err) => console.log(err));
    }, []);
    
    
    return (
        <>
            <p>{company.name}</p>
            <p>{company.description}</p>
            <p>{company.location}</p>
            {/* //<p>{date}</p> */}
            <Calendar date={date} focused={focused} setDate={setDate} setFocus={setFocus}/>
            <Booking date={date}/>
            <Link to={`/`}>Back</Link>
        </>
    )
};

function Calendar({ date, focused, setDate, setFocus}) {
    console.log(Object.keys(date).length);
    return (
        <>
            <SingleDatePicker
                date={date}
                onDateChange={(date) => setDate(date)}
                focused={focused}
                onFocusChange={({ focused }) => setFocus(focused)}
                id="date"
            />
        </>
    );
};

function Booking(date) {
    React.useEffect(() => {
        console.log("date changed! " + date);
    }, [date]);
    if (date === null) {
        return (
            <div>
                <button>Hej</button>
            </div>
        )
    }
    else return (
        <p> NO BOOKING</p>
    )
}

export default Details;