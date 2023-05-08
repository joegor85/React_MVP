import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import ListOfLists from "./ListOfLists";
import ListDisplay from "./ListDisplay";

function App() {
  const [count, setCount] = useState(0);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedListData, setSelectedListData] = useState([]);

  const fetchTitleData = () => {
    return fetch("http://localhost:3000/api/lists")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLists(data);
      });
  };

//fetching the list titles when the App loads
  useEffect(() => {
    fetchTitleData();
  }, []);

//Check to make sure I logged the right list_id when clicked
  useEffect(() => {
    console.log(selectedList);
  }, [selectedList]);

// Pull a specific list's data from the server when clicked on
  const fetchSpecificListData = () => {
    return fetch(`http://localhost:3000/api/lists/${selectedList}`)
      .then((response) => response.json())
      .then((listData) => {
        setSelectedListData(listData);
      });
  };

// Add a new list to the database when clicking the add(+) button
  const addNewList = async () => {
    let newList = window.prompt("Enter a new list name:");
    try {
      await fetch("http://localhost:3000/api/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "listName": newList
      }),
      });
      await fetchTitleData();
    } catch (error) {
      console.error("Error adding list:", error);
    }
  }


  //Fetch data for a list when selected
  useEffect(() => {
    if (selectedList !== null) {
      fetchSpecificListData();
    }
  }, [selectedList]);

  //Check to make sure I logged the right listData
  useEffect(() => {
    console.log(selectedListData);
  }, [selectedListData]);

  return (
    <>
      <h1>Joe's List Manager</h1>
      <button className="listTitles" onClick={addNewList}>+</button>
      <ListOfLists
        lists={lists}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        fetchTitleData={fetchTitleData}
      />

      <ListDisplay
        selectedList={selectedList}
        selectedListData={selectedListData}
        fetchSpecificListData={fetchSpecificListData}
      />
    </>
  );
}

export default App;

//Old Vite stuff:
// <div>
//   <a href="https://vitejs.dev" target="_blank">
//     <img src={viteLogo} className="logo" alt="Vite logo" />
//   </a>
//   <a href="https://react.dev" target="_blank">
//     <img src={reactLogo} className="logo react" alt="React logo" />
//   </a>
// </div>
// <h1>Vite + React</h1>
// <div className="card">
//   <button onClick={() => setCount((count) => count + 1)}>
//     count is {count}
//   </button>
//   <p>
//     Edit <code>src/App.jsx</code> and save to test HMR
//   </p>
// </div>
// <p className="read-the-docs">
//   Click on the Vite and React logos to learn more
// </p>
