import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [data,setData] = useState([])
    const [id,setId] = useState("")
    const [media_url,setMedia_url] = useState("")
    const [category_name,setCategory_name] = useState("")
    useEffect(()=>{
    fetch("https://cheersat7.herokuapp.com/api/v1/category/get-categories-by-type",{ 
    method : 'POST',
    headers : {
    'Content-type': 'application/json'
    },
    body: JSON.stringify({
    type: 'celebration'
    })
    })
    //fetch end 
     .then((result)=>{
    result.json().then((resp)=>{
    console.log("result",resp);
    //resp is all data from the api
    console.log("data1",resp.data.categories);
    //resp.data.categoreies is first data
    setData(resp.data.categories)
    })
    })
    },[])
    console.log("useState",data);
    //it print what data is filled in usestate
    /*
            function  
                      To 
                        Add data in use state
                       */
    function addItem(){
    let identity=window.prompt("ID");
    let media=window.prompt("Media_url");
    let name=window.prompt("category_name");
    setId(identity);
    setMedia_url(media);
    setCategory_name(name);
    console.log(id,category_name,media_url);
    let input={
    "_id":id,
    "category_name":category_name,
    "media_url":media_url
    }
    console.log(input);
    setData((prevItem) => {
          return [input,...prevItem];
        });
    }

function handleRemoveItem(iden){
console.log("datadelete",data)
let deletedData=data.filter(index =>index!== iden)
console.log("idx",deletedData)
    setData(deletedData)
console.log("datadeleted",data);
}
    return (
      <div className="App">
  <button onClick={()=>addItem()}>Add</button>
        {data.map((item,i)=>{
                        return( <div key={i} className="card" style={{width:"18rem"}}>
                                 <img src={item.media_url} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.category_name}</h5>
                                        <a href="./" className="btn btn-dark" style={{margin:"10%"}}> UPDATE</a>
                                         <span type="button" onClick={()=>handleRemoveItem(item._id)} className="btn btn-dark">DELETE</span>
                                    </div>
                               </div>)
                      })
                      }
      </div>
    )
}

export default App
