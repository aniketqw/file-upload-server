# File Upload Server

A minimalist file upload system built with Node.js and Express for FreeBSD systems. This application provides a simple web interface for uploading, viewing, and downloading files across your network.

<img width="873" alt="image" src="https://github.com/user-attachments/assets/c21c478e-bc05-4508-94e3-87ceb7066cae" />


## Features

- Simple web-based file upload interface
- Original filename preservation
- File listing with size and upload date
- Direct file download capability
- Network-wide accessibility
- Responsive design for all devices

## Prerequisites

Before you begin, ensure you have:
- FreeBSD system
- Git installed
- Node.js (version 21 or higher)
- npm (Node Package Manager)

## Step-by-Step Installation Guide

### 1. Install Required Packages
First, update your FreeBSD system and install the necessary packages:
```bash
# Update package repository
pkg update

# Install Node.js and npm
pkg install node21 npm-node21

# Install Git if not already installed
pkg install git
```

### 2. Clone the Repository
```bash
# Clone the repository
git clone https://github.com/aniketqw/file-upload-server.git

# Navigate to the project directory
cd file-upload-server
```

### 3. Install Dependencies
```bash
# Initialize npm project
npm init -y

# Install required packages
npm install express multer
```

### 4. Set Up the Upload Directory
```bash
# Create uploads directory
mkdir uploads

# Set correct permissions
chmod 755 uploads
```

### 5. Install PM2 Process Manager
```bash
# Install PM2 globally
npm install -g pm2
```

## Configuration

### 1. Server Configuration (server.js)
The server runs on port 3000 by default. If you need to change this:
1. Open `server.js`
2. Locate the line: `const port = 3000;`
3. Change the port number as needed

### 2. File Upload Limits
Default maximum file size is 10MB. To modify:
1. Open `server.js`
2. Find the multer configuration section
3. Adjust the `fileSize` limit:
```javascript
limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
}
```

## Running the Application

### 1. Start the Server
```bash
# Start the server using PM2
pm2 start server.js --name "file-upload-server"

# Ensure the server starts on boot
pm2 startup
pm2 save
```

### 2. Verify Server Status
```bash
# Check if the server is running
pm2 status

# View server logs
pm2 logs file-upload-server
```

### 3. Access the Application
Open your web browser and navigate to:
```
http://<FreeBSD_IP_ADDRESS>:3000
```
Replace `<FreeBSD_IP_ADDRESS>` with your server's IP address.

## Usage Guide

### Uploading Files
1. Click the "Choose File" button
2. Select the file you want to upload
3. Click the "Upload" button
4. Wait for the upload to complete
5. The page will refresh automatically

### Viewing Files
- All uploaded files are listed in the table below the upload form
- The table shows:
  - File name
  - File size
  - Upload date
- Click "Refresh Files" to update the list

### Downloading Files
- Click the "Download" link next to any file to download it
- Files are downloaded with their original names

## Troubleshooting

### Common Issues and Solutions

1. **Upload Not Working**
   - Check server logs: `pm2 logs file-upload-server`
   - Verify uploads directory permissions: `ls -la uploads/`
   - Ensure file size is within limits

2. **File List Not Loading**
   - Check browser console for errors (F12)
   - Verify server is running: `pm2 status`
   - Check network connectivity

3. **Permission Issues**
   ```bash
   # Reset uploads directory permissions
   chmod 755 uploads
   chown your_user:your_group uploads
   ```

4. **Server Won't Start**
   - Check if port 3000 is already in use:
     ```bash
     sockstat -4 | grep 3000
     ```
   - Try stopping and restarting:
     ```bash
     pm2 stop file-upload-server
     pm2 start file-upload-server
     ```

## Maintenance

### Regular Maintenance Tasks
```bash
# Update dependencies
npm update

# Check server status
pm2 status

# View logs
pm2 logs

# Restart server
pm2 restart file-upload-server
```

### Backup
Regularly backup your uploads directory:
```bash
tar -czf backup-$(date +%Y%m%d).tar.gz uploads/
```

## Security Considerations

- The server accepts all file types by default
- Files are stored with original names
- No authentication system is implemented
- Consider implementing additional security measures for production use

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or need assistance, please open an issue on the GitHub repository.

---

For more information or updates, visit the [GitHub repository](https://github.com/aniketqw/file-upload-server).
