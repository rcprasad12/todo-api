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


app.get('/todos/:id' , (req,res)=>{
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


//create a todo 


app.post('/todos' , (req,res)=>{
    const {title , description } = req.body;

    if(!title){
        return res.status(400).json({
            success : false ,
            message : "Title is required"
        });
    }

    const newTodo = {
        id : nextId++ ,
        title ,
        description : description || '' ,
        completed : false ,
        createdAt : new Date().toISOString()

    };

    todos.push(newTodo);
    res.status(201).json({
        success : true ,
        data    : newTodo

    });

});


// update an existing todo 




app.put('/todos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t=>t.id === id);

    if(todoIndex == -1){
        return res.status(400).json({
            success : false ,
            message : "todo not found"

        });
    }

    const {title ,description , completed} = req.body;
    
    todos[todoIndex] = {
        ...todos[todoIndex],
        title : title !== undefined ? title : todos[todoIndex].title,


        

        description : description !== undefined ? description : todos[todoIndex].description,

        completed : completed !== undefined ? completed : todos[todoIndex].completed ,

        updatedAt : new Date().toISOString(),

    };
    res.json({
        success : true ,
        data    : todos[todoIndex]
    });

    

});

//delete the todo 

app.delete('/todos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t=>t.id === id);
    if(todoIndex === -1){
        return res.status(400).json({
            success : false ,
            message : "todo not found"
        });



    }

    todos.splice(todoIndex,1);
    res.json({
        success : true ,
        message : "delete the todo succesfully"
    });
});














