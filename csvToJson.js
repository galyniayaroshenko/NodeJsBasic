const fs = require('fs');
const csv = require('csvtojson');

const csvFilePath = './csvdirectory/example_from_internet.csv';
const txtFilePath = './csvdirectory/output.txt';

// Create a read stream for the CSV file
const csvReadStream = fs.createReadStream(csvFilePath);

// Create a write stream for the output text file
const txtWriteStream = fs.createWriteStream(txtFilePath);

// Use the csvtojson library to convert CSV to JSON line by line
csv()
  .fromStream(csvReadStream)
  .subscribe(
    (jsonObj) => {
      // Convert the JSON object to a string and write it to the text file
      const jsonString = JSON.stringify(jsonObj);
      txtWriteStream.write(jsonString + '\n');
    },
    (error) => {
      // Handle errors during conversion
      console.error('Error:', error);
    },
    () => {
      // Conversion is complete. Close the write stream
      txtWriteStream.end();
      console.log('Conversion complete. Data written to output.txt');
    }
  );
