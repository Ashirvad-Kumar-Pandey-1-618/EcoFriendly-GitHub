const fs = require('fs').promises;
const fetch = require('node-fetch');

async function updateReadme() {
    let prevData = "";

    try {
        prevData = await fs.readFile('quotes.txt', 'utf-8');
    } catch (err) {
        if (err.code !== 'ENOENT') throw err; // Only throw error if file not found
    }
    
    let readme = "";
    
    try {
        const response = await fetch("https://api.quotable.io/random");
        if (!response.ok) throw new Error('response not OK');

        const data = await response.json();
        readme = `Quote on ${new Date().toUTCString()}: ${data.content} - ${data.author}`;
    } catch (e) {
        readme = `Fetching failed: ${e.message}`;
    }
    
    prevData += "\n";
    prevData += readme;
    
    console.log(prevData);
}

updateReadme();
