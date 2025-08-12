const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

// Serve static files first
app.use(express.static(__dirname));

app.get('*', (req, res) => {
    if (req.path.startsWith('/partials/') || 
        req.path.startsWith('/css/') || 
        req.path.startsWith('/js/') ||
        req.path.includes('.')) {
        return; 
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});