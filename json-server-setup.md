JSON Server Setup
1. Download Node.js

Download and install Node.js from the official website:

https://nodejs.org/dist/v24.21.0/node-v24.21.0-x64.msi - Windows

https://nodejs.org/dist/v24.21.0/node-v24.21.0.pkg - MacOS

https://nodejs.org/dist/v24.21.0/node-v24.21.0-linux-x64.tar.xz - Linux

2. Check Node.js Installation

Open the VS Code Terminal (or Command Prompt) and run:

node --version


You can also check the npm version:

npm --version


If a version number is displayed, Node.js and npm have been installed successfully.

3. Install JSON Server

Install JSON Server globally using:

npm install -g json-server

4. Start JSON Server

Make sure your terminal is opened in the folder containing your JSON file, then run:

json-server db.json


Note: Replace db.json with the name of your JSON file if it has a different name.

For example, if your file is named data.json:

json-server data.json

Website will be accessible via "http://localhost:3000/" on local machine.