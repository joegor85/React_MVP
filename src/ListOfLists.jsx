import trash from "./assets/trash.png";

const ListOfLists = (props) => {
  function handleTitleClick(listId) {
    props.setSelectedList(listId);
    // console.log(props.selectedList);  --this doesn't work because it's async, so place this in useEffect on App level instead
  }

  const deleteList = async (listId) => {
    const answer = window.confirm("Are you sure you want to delete this list?");
    if (answer) {
      try {
        await fetch(`http://localhost:3000/api/lists/${listId}`, {
          method: "DELETE",
        });
        await props.fetchTitleData();
        props.setSelectedList(null);
      } catch (error) {
        console.error("Error deleting list:", error);
      }
    } else {
      return;
    }
  };

  return (
    <div className="listNames">
      {props.lists.map((list) => (
        <div className="titleContainer" key={list.list_id}>
          <h2
            className="listTitles"
            onClick={() => handleTitleClick(list.list_id)}
          >
            {list.listname}
          </h2>
          <button className="trash" onClick={() => deleteList(list.list_id)}>
            <img className="trashCan" src={trash}></img>
          </button>
        </div>
      ))}
      {/* old hard-coded stuff: */}
      {/* <h2>List1</h2><h2>List2</h2><h2>List3</h2> */}
    </div>
  );
};

// const ListOfLists = (props) => {
//     function handleTitleClick(listId) {
//       props.setSelectedList(listId);
//     }

//     return (
//       <div className="listNames">
//         {props.lists.map((list) => (
//           <h2 className="listTitles" key={list.list_id} onClick={() => handleTitleClick(list.list_id)}>
//             {list.listname}
//           </h2>
//         ))}
//       </div>
//     );
//   };

export default ListOfLists;
