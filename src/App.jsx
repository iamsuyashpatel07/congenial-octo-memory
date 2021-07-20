import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("https://cheersat7.herokuapp.com/api/v1/category/get-categories-by-type", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'celebration'
                })
            })
            //fetch end 
            .then((result) => {
                result.json().then((resp) => {
                    console.log("result", resp);
                    //resp is all data from the api
                    console.log("data1", resp.data.categories);
                    //resp.data.categoreies is first data
                    setData(resp.data.categories)
                })
            })
    }, [])
    console.log("useState", data);
    //it print what data is filled in usestate
    /*
            function  
                      To 
                        Add data in use state
                       */
    function addItem() {
        let identity = window.prompt("ID");
        let media = window.prompt("Media_url");
        let name = window.prompt("category_name");
        setData((prevFriends) => [
        {
            "_id": identity,
            "category_name": name,
            "media_url": media
        },...prevFriends,
    ]);

    }

    function handleRemoveItem(iden) {
      alert(iden);
        console.log("datadelete", data[iden]);
            //var newdata=
         data.splice(iden,1);
        //setData(newdata);
           setData(data);
            useEffect()
        console.log("datadeleted", data);
    }

    function handleUpdateItem(iden) {
        alert("we are updating category name");
      let updatedCategort_name=window.prompt("new category name")
      setData(
            data.map((info) =>
                info._id === iden
                    ? { ...info, category_name: updatedCategort_name }
                    : { ...info}
            )
        );
        console.warn("updated array", data);
    }
    return ( <div className="App">
        <button onClick={() => addItem()}>Add</button> {
        data.map((item,i) => {
                return (<div key={ i } className="card" style={{width: "18rem" }}>
                    <img src={ item.media_url } className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">{item.category_name} </h5> 
                    <span type="button" onClick={()=>handleUpdateItem(item._id)} className="btn btn-dark" style={{ margin: "10%" }}>UPDATE</span> 
                    <span type = "button" onClick={() => handleRemoveItem(i)} className = "btn btn-dark">DELETE</span>
                    </div> </div>)
                })
        } </div>
    )
}

export default App