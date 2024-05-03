const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let clockData = {}; // array variable

app.post('/clock_in', (req, res) => {
    try {
        // define the const
        const {userPosPin} = req.body; // request the pospin variable from frontend
        const currentTime = new Date(); // current date & time of your PC is stored into variable 'currentTime'

        // Check if pospin data is not exist, else move to true statement below
        if(!userPosPin) {
            console.log('I did not get any pospin data from frontend:', userPosPin); // debug variable userPosPin
            res.status(400).json({ message: 'Backend did not respond to pospin data!'}); // send the data back to frontend. You may see this data frontend terminal
        }

        // Execute the true statement
        clockData[userPosPin] = {clockInTime: currentTime}; // use the keyword 'clockInTime' and stored into clockData array
        console.log('My first clockData:', clockData[userPosPin]); // debug variable clockData array
        res.status(200).json({ success: 'Clock in successful!'}); // send the data back to frontend. You may see this data frontend terminal
    } catch (error) {
        console.log('Try statement is not executed. Means there is a false in frontend sending pospin data'); // debug the error
        res.status(500).json({ error: 'Please check your logic to send pospin data to backend!'}); // send the data back to frontend. You may see this data frontend terminal
    }
});

app.post('/lunch_break', (req, res) => {
    try {
        const {userPosPin} = req.body; // request the pospin variable from frontend
        const currentTime = new Date(); // current date & time of your PC is stored into variable 'currentTime'

        // Check if pospin data is not equal to empty string, else move to true statement below
        if(userPosPin !== '') {
            console.log('I still read the pospin data:', userPosPin); // debug variable userPosPin
            res.status(400).json({ message: 'Backend still hold to pospin data. Please make the data to empty string!'}); // send the data back to frontend. You may see this data frontend terminal
        }

        clockData[userPosPin] = {lunchTime: currentTime}; // use the keyword 'lunchTime' and stored into clockData array
        console.log('My lunch break clockData:', clockData[userPosPin]); // debug variable clockData array
        res.status(200).json({ success: 'Clock out for lunch successful!'}); // send the data back to frontend. You may see this data frontend terminal
    } catch (error) {
        console.log('Try statement is not executed. Means there is a false in frontend sending pospin data'); // debug the error
        res.status(500).json({ error: 'Please check your logic to send pospin data to backend!'}); // send the data back to frontend. You may see this data frontend terminal
    }
});

app.post('/after_break', (req, res) => {
    try {
        const {userPosPin} = req.body; // request the pospin variable from frontend
        const currentTime = new Date(); // current date & time of your PC is stored into variable 'currentTime'

        // Check if pospin data is not exist, else move to true statement below
        if(!userPosPin) {
            console.log('I did not get any pospin data from frontend after lunch break:', userPosPin); // debug variable userPosPin
            res.status(400).json({ message: 'Backend did not respond to pospin data!'}); // send the data back to frontend. You may see this data frontend terminal
        }

        clockData[userPosPin] = {afterLunch: currentTime}; // use the keyword 'afterLunch' and stored into clockData array
        console.log('My lunch break clockData:', clockData[userPosPin]); // debug variable clockData array
        res.status(200).json({ success: 'Clock in after lunch successful!'}); // send the data back to frontend. You may see this data frontend terminal
    } catch (error) {
        console.log('Try statement is not executed. Means there is a false in frontend sending pospin data'); // debug the error
        res.status(500).json({ error: 'Please check your logic to send pospin data to backend!'}); // send the data back to frontend. You may see this data frontend terminal
    }
});

app.post('/clock_out', (req, res) => {
    try {
        const {userPosPin} = req.body; // request the pospin variable from frontend
        const currentTime = new Date(); // current date & time of your PC is stored into variable 'currentTime'

        // Check if pospin data is not exist, else move to true statement below
        if(userPosPin !== '') {
            console.log('I still read the pospin data after logout:', userPosPin); // debug variable userPosPin
            res.status(400).json({ message: 'Backend still hold to pospin data!'}); // send the data back to frontend. You may see this data frontend terminal
        }

        clockData[userPosPin] = {clockOutTime: currentTime}; // use the keyword 'clockOutTime' and stored into clockData array
        console.log('My lunch break clockData:', clockData[userPosPin]); // debug variable clockData array

        clockData = {}; // empty the 'clockData' variable
        console.log('After logout data inside clockData:', clockData); // debug the variable 'clockData'
        res.status(200).json({ success: 'Clock out for going home success!'}); // send the data back to frontend. You may see this data frontend terminal
    } catch (error) {
        console.log('Try statement is not executed. Means there is a false in frontend sending pospin data'); // debug the error
        res.status(500).json({ error: 'Please check your logic to send pospin data to backend!'}); // send the data back to frontend. You may see this data frontend terminal
    }
});

app.listen(port, () => {
    console.log('Server is running on port:', port);
});