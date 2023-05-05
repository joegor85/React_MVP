
const ListOfLists = (props) => {
    function handleTitleClick(listId) {
        props.setSelectedList(listId);
        // console.log(props.selectedList);  --this doesn't work because it's async, so place this in useEffect on App level instead
    }

    return (
    <div className="listNames">
        {props.lists.map((list) => (
            <h2 className="listTitles" key={list.list_id} onClick={() => handleTitleClick(list.list_id)}>{list.listname}</h2>
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