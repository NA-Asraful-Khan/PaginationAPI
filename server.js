const express = require("express");
const data = require("./data");
const app = express();
const PORT = 3000;

// Data from the provided JSON

// Route to handle paginated API
app.get("/api/data", (req, res) => {
  // Get the page and limit query parameters, default to page 1 and limit 10
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided

  // Calculate the starting and ending index
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Slice the data for the current page
  const paginatedData = data.slice(startIndex, endIndex);

  // Calculate the next and previous page numbers
  const nextPage = page < Math.ceil(data.length / limit) ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;

  // Create response object
  const response = {
    currentPage: page,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / limit),
    nextPage: nextPage,
    previousPage: previousPage,
    limit: limit,
    data: paginatedData,
  };

  res.json(response);
});

app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Welcome</h1>
        <p>Go to the following link:</p>
        <div><a href="http://localhost:3000/api/data?page=1&limit=10" target="_blank">http://localhost:3000/api/data?page=1&limit=10</a><div/>
        <div><a href="http://localhost:3000/api/data?page=2&limit=10" target="_blank">http://localhost:3000/api/data?page=2&limit=10</a><div/>
        <div><a href="http://localhost:3000/api/data?page=3&limit=10" target="_blank">http://localhost:3000/api/data?page=3&limit=10</a><div/>
        <div>.<div/>
        <div>.<div/>
        <div>.<div/>
        <div><a href="http://localhost:3000/api/data?page=500&limit=10" target="_blank">http://localhost:3000/api/data?page=500&limit=10</a><div/>
      </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
