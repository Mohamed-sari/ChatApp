const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { StreamChat } = require('stream-chat');

const app = express();
const port = 5000;

const apiKey = 'xpeqzahxkx6u';
const apiSecret = 'egjhqj973sgdrdzbwmruahqqnzkn3sekm92zykt88y5njnna2nwkedkym5dw2acd';

const serverClient = new StreamChat(apiKey, apiSecret);

app.use(cors());
app.use(bodyParser.json());

// Endpoint to generate a token
app.post('/getToken', (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).send({ message: 'User ID is required' });
    }

    const token = serverClient.createToken(userId);
    res.send({ token });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
