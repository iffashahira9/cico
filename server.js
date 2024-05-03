const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let clockData = []; // array variable

app.post('/clock_in', (req, res) => {
    try {
        // define the const
        const {userPosPinClockIn} = req.body; // request the pospin variable from frontend
        const currentTime = new Date(); // current date & time of your PC is stored into variable 'currentTime'

        // Check if pospin data is not exist, else move to true statement below
        if(!userPosPinClockIn) {
            console.log('I did not get any pospin data from frontend:', userPosPinClockIn); // debug variable userPosPin
            res.status(400).json({ message: 'Backend did not respond to pospin data!'}); // send the data back to frontend. You may see this data frontend terminal
        }

        // Execute the true statement
        // Push the data into clockData array
        clockData.push({
            userPosPin: userPosPinClockIn,
            clockInTime: currentTime,
            lunchTime: undefined || '',
            afterLunch: undefined || '',
            clockOutTime: undefined || '',
        });
        console.log('My first clockData:', clockData); // debug variable clockData array
        res.status(200).json({ success: 'Clock in successful!'}); // send the data back to frontend. You may see this data frontend terminal
    } catch (error) {
        console.log('Try statement is not executed. Means there is a false in frontend sending pospin data'); // debug the error
        res.status(500).json({ error: 'Please check your logic to send pospin data to backend!'}); // send the data back to frontend. You may see this data frontend terminal
    }
});

app.post('/lunch_break', (req, res) => {
    try {
        const {userPosPinLunchBreak} = req.body; // request the pospin variable from frontend
        const currentTime = new Date(); // current date & time of your PC is stored into variable 'currentTime'

        // Call the variable clockData array to find the index of 'userPosPin' and stored it into 'index' variable
        const index = clockData.findIndex(data => data.userPosPin);

        // If 'userPosPinLunchBreak' retrieve from frontend is not the same value as userPosPin in array AND if the index found is not -1 (meaning a matching entry is found)
        if(userPosPinLunchBreak !== clockData[index].userPosPin && index !== -1) {
            clockData[index].userPosPin = userPosPinLunchBreak; // update the userPosPin data array
            clockData[index].lunchTime = currentTime; // update the currentTime data array
            console.log('My lunch break clockData:', clockData); // debug variable clockData array
            res.status(200).json({ success: 'Clock out for lunch successful!'}); // send the data back to frontend. You may see this data frontend terminal
        }
    } catch (error) {
        console.log('Try statement is not executed. Means there is a false in frontend sending pospin data'); // debug the error
        res.status(500).json({ error: 'Please check your logic to send pospin data to backend!'}); // send the data back to frontend. You may see this data frontend terminal
    }
});

app.post('/after_break', (req, res) => {
    try {
        const {userPosPinAfterBreak} = req.body; // request the pospin variable from frontend
        const currentTime = new Date(); // current date & time of your PC is stored into variable 'currentTime'

        // Call the variable clockData array to find the index of 'userPosPin' that has the empty string value and stored it into 'index' variable
        const index = clockData.findIndex(data => data.userPosPin === '');

        // If 'userPosPinAfterBreak' retrieve from frontend is not the same value as userPosPin in array AND if the index found is not -1 (meaning a matching entry is found)
        if(userPosPinAfterBreak !== clockData[index].userPosPin && index !== -1) {
            clockData[index].userPosPin = userPosPinAfterBreak; // update the userPosPin data
            clockData[index].afterLunch = currentTime; // update the currentTime data
            console.log('My after break clockData:', clockData); // debug variable clockData array
            res.status(200).json({ success: 'Clock in after break successful!'}); // send the data back to frontend. You may see this data frontend terminal
        }
    } catch (error) {
        console.log('Try statement is not executed. Means there is a false in frontend sending pospin data'); // debug the error
        res.status(500).json({ error: 'Please check your logic to send pospin data to backend!'}); // send the data back to frontend. You may see this data frontend terminal
    }
});

app.post('/clock_out', (req, res) => {
    try {
        const {userPosPinClockOut} = req.body; // request the pospin variable from frontend
        const currentTime = new Date(); // current date & time of your PC is stored into variable 'currentTime'

        // Call the variable clockData array to find the index of 'userPosPin' that has the empty string value and stored it into 'index' variable
        const index = clockData.findIndex(data => data.userPosPin);

        // If 'userPosPinAfterBreak' retrieve from frontend is not the same value as userPosPin in array AND if the index found is not -1 (meaning a matching entry is found)
        if(userPosPinClockOut !== clockData[index].userPosPin && index !== -1) {
            clockData[index].userPosPin = userPosPinClockOut; // update the userPosPin data
            clockData[index].clockOutTime = currentTime; // update the currentTime data
            console.log('My clock out ---- clockData:', clockData); // debug variable clockData array
            res.status(200).json({ success: 'Clock out successful!'}); // send the data back to frontend. You may see this data frontend terminal
        }
    } catch (error) {
        console.log('Try statement is not executed. Means there is a false in frontend sending pospin data'); // debug the error
        res.status(500).json({ error: 'Please check your logic to send pospin data to backend!'}); // send the data back to frontend. You may see this data frontend terminal
    }
});

app.listen(port, () => {
    console.log('Server is running on port:', port);
});