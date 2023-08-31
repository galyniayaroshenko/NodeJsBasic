const { execSync } = require('child_process');
const fs = require('fs');

const platform = process.platform;
const refreshInterval = 100;
const logInterval = 60000;

function getTopProcessInfo() {
  const command = getCommandBasedOnPlatform();

  return execSync(command).toString().trim();
}

function getCommandBasedOnPlatform() {
  if (platform === 'win32') {
    return 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"';
  } else {
    return 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
  }
}

function logToFile(content) {
  const timestamp = Date.now();
  const logEntry = `${timestamp} : ${content}\n`;
  
  fs.appendFile('activityMonitor.log', logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

function updateDisplay() {
  process.stdout.write(getTopProcessInfo() + '\r');
}

setInterval(updateDisplay, refreshInterval);
setInterval(() => logToFile(getTopProcessInfo()), logInterval);
