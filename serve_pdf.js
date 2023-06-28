const express = require('express');
const app = express();
const path = require('path');



// Serve the PDF file
app.use('/', express.static(path.resolve(__dirname, './calameo_output.pdf')));

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
