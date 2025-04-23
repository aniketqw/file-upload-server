const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Configure storage to use original filenames
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Save with original filename
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle uploads
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.redirect('/'); // Redirect back to main page after upload
});

// Get list of files
app.get('/files', (req, res) => {
    fs.readdir('uploads/', (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading directory' });
        }
        const fileList = files.map(file => {
            const stats = fs.statSync(`uploads/${file}`);
            return {
                name: file,
                size: (stats.size / 1024).toFixed(2) + ' KB',
                date: stats.mtime.toLocaleDateString()
            };
        });
        res.json(fileList);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

