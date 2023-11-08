// Create a Node.js script that reads the contents of a text file and writes them
// to another file using asynchronous file I/O with callbacks.
// Ensure proper error handling and support for reading and writing large files.
const fs = require("fs");

const sourceFilePath = "input.txt"; // Replace with your source file path
const destinationFilePath = "output.txt"; // Replace with your destination file path

// Create a readable stream for the source file
const readStream = fs.createReadStream(sourceFilePath, "utf8");

// Create a writable stream for the destination file
const writeStream = fs.createWriteStream(destinationFilePath);

// Error handling for the source file
readStream.on("error", (err) => {
  console.error(`Error reading the source file: ${err}`);
});

// Error handling for the destination file
writeStream.on("error", (err) => {
  console.error(`Error writing to the destination file: ${err}`);
});

// When the source file is opened and ready for reading
readStream.on("open", () => {
  console.log(`Reading from ${sourceFilePath}`);
});

// When the destination file is opened and ready for writing
writeStream.on("open", () => {
  console.log(`Writing to ${destinationFilePath}`);
});

// Pipe the contents from the source file to the destination file
readStream.pipe(writeStream);

// When the data is fully written to the destination file
writeStream.on("finish", () => {
  console.log("File write operation completed.");
});

// Close the writable stream when the write operation is finished
writeStream.on("close", () => {
  console.log("Destination file stream closed.");
});

// Error handling for stream operations
readStream.on("error", (err) => {
  console.error(`Error reading from the source file: ${err}`);
});

writeStream.on("error", (err) => {
  console.error(`Error writing to the destination file: ${err}`);
});

// Take a common callback-based function, such as fs.readFile, and
// promisify it. Create a function that returns a Promise-based version
// of the callback function.

const fs = require("fs");
const util = require("util");

// Promisify the fs.readFile function
const readFileAsync = util.promisify(fs.readFile);

// Usage example:
const filePath = "example.txt";

readFileAsync(filePath, "utf8")
  .then((data) => {
    console.log("File contents:", data);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

//Using the Node.js http or axios library, fetch data from an
//external API (e.g., JSONPlaceholder or any public API).
//Once the data is retrieved, use Promises to process and
//display specific information from the response.
const axios = require("axios");

// Define the URL of the JSONPlaceholder API endpoint you want to fetch data from
const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";

// Function to fetch data from the API using axios
function fetchDataFromAPI() {
  return axios
    .get(apiUrl)
    .then((response) => {
      // Extract and display specific information from the response
      const data = response.data;
      console.log("Title:", data.title);
      console.log("Body:", data.body);
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });
}

// Call the function to fetch and process the data
fetchDataFromAPI();

//Create an application that uses async/await to make multiple
//API requests in parallel and aggregate the results.
//For example, fetch data from two different endpoints and
//combine the data into a single response.

const axios = require("axios");

// Define the URLs of the endpoints you want to fetch data from
const apiUrl1 = "https://jsonplaceholder.typicode.com/posts/1";
const apiUrl2 = "https://jsonplaceholder.typicode.com/posts/2";

// Function to fetch data from an API using axios
async function fetchDataFromAPI(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from ${apiUrl}: ${error.message}`);
  }
}

// Function to fetch data from multiple APIs in parallel and aggregate the results
async function fetchDataFromMultipleAPIs() {
  try {
    // Use Promise.all to make parallel API requests
    const [data1, data2] = await Promise.all([
      fetchDataFromAPI(apiUrl1),
      fetchDataFromAPI(apiUrl2),
    ]);

    // Combine the results into a single response
    const combinedData = {
      dataFromEndpoint1: data1,
      dataFromEndpoint2: data2,
    };

    return combinedData;
  } catch (error) {
    console.error(error.message);
  }
}

// Call the function to fetch data from multiple APIs and aggregate the results
fetchDataFromMultipleAPIs()
  .then((result) => {
    console.log("Combined Data:", result);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

//Implement a simple queue system using Promises. 
//You should be able to add tasks to the queue and
//execute them one by one in the order they were added,
//with each task completing before the next one starts.

class PromiseQueue {
    constructor() {
      this.queue = [];
      this.running = false;
    }
  
    addTask(taskFunction) {
      return new Promise((resolve, reject) => {
        const task = { taskFunction, resolve, reject };
        this.queue.push(task);
        this.processQueue();
      });
    }
  
    async processQueue() {
      if (this.running) {
        return;
      }
  
      while (this.queue.length > 0) {
        this.running = true;
        const { taskFunction, resolve, reject } = this.queue.shift();
        
        try {
          const result = await taskFunction();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.running = false;
        }
      }
    }
  }
  
  // Example usage:
  const queue = new PromiseQueue();
  
  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
  queue.addTask(async () => {
    console.log('Task 1 started');
    await delay(1000);
    console.log('Task 1 completed');
  });
  
  queue.addTask(async () => {
    console.log('Task 2 started');
    await delay(500);
    console.log('Task 2 completed');
  });
  
  queue.addTask(async () => {
    console.log('Task 3 started');
    await delay(1500);
    console.log('Task 3 completed');
  });
  