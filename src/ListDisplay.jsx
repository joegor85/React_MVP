import whiteTrash from "./assets/whitetrash.png";

const ListDisplay = (props) => {
  //By defining this as a variable, I will not have to do this in the onClick call: () => addItem...
  const addItem = async () => {
    const list = props.selectedList;
    let newItem = window.prompt("Enter a new item:");
    try {
      await fetch("http://localhost:3000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          list: list,
          itemName: newItem,
        }),
      });
      await props.fetchSpecificListData();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await fetch(`http://localhost:3000/api/items/${itemId}`, {
        method: "DELETE",
      });
      await props.fetchSpecificListData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="listDisplay">
      {props.selectedList ? (
        <>
          <h2>List title: {props.selectedListData.listname}</h2>

          {/* This doesn't work if the data is too slow to come in, so I needed a buffer below */}
          {/* <div className="listItemContainer">
            {props.selectedListData.items.map((item) => (
              <h3 key={item.id}>{item.name}</h3>
            ))}
          </div> */}

          {/* ---------------My buffer code: */}
          {props.selectedListData.items ? (
            <div className="listItemContainer">
              {props.selectedListData.items.map((item) => (
                <div key={item.id} className="eachItem">
                  <h3>{item.name}</h3>
                  <button
                    className="whiteTrash"
                    onClick={() => deleteItem(item.id)}
                  >
                    <img className="whiteTrashCan" src={whiteTrash}></img>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>Loading...</div>
          )}
          {/* -------------------------------- */}
          <h3 className="addItem" onClick={addItem}>
            +
          </h3>
        </>
      ) : (
        <>
          {/* <h2>List title:</h2> */}
          <div className="listItemContainer">
            {/* <h3>List item1</h3>
            <h3>List item2</h3>
            <h3>List item3</h3> */}
          </div>
        </>
      )}
      {/* old hardcoded stuff: */}
      {/* <h2>List title:</h2>
      <div className="listItemContainer">
        <h3>List item1</h3>
        <h3>List item2</h3>
        <h3>List item3</h3>
      </div> */}
    </div>
  );
};

export default ListDisplay;
