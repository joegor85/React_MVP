

const ListDisplay = (props) => {


  return (
    <div className="listDisplay">
      {props.selectedList ? (
        <>
          <h2>List title: {props.selectedListData.listname}</h2>
          <div className="listItemContainer">
            {props.selectedListData.items.map((item) => <h3 key={item.id}>{item.name}</h3>)}
          </div>
        </>
      ) : (
        <>
          <h2>List title:</h2>
          <div className="listItemContainer">
            <h3>List item1</h3>
            <h3>List item2</h3>
            <h3>List item3</h3>
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
