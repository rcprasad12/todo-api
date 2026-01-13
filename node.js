const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let nextId = 1;

//start the server 

app.listen(PORT , ()=>{
    console.log(`Server is running on the http://localhost:${PORT}`);

    

})

//get ALL the todos

app.get('/todos' , (req,res)=>{
    res.json({
        sucess : true , 
        data  : todos
    });
});

//get todo specific for an ID 


app.get('/todos' , (req,res)=>{
    const id = parseInt(req.params.id);
    const todo = todos.find(t=>t.id === id);

    
    if(!todo){
        return res.status(404).json({
            success : false ,
            message : "Todo not found"
        });
    }
    res.json({
        success : true ,
        data    : todo
    });

});








