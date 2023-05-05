
//testing the data fetch
fetch("http://localhost:3000/api/lists").then((response) => response.json()).then((data) => console.log(data));