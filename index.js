//Для того, чтобы пользователи хранились постоянно, а не только, когда запущен сервер, необходимо реализовать хранение массива в файле.

//Подсказки:
//— В обработчиках получения данных по пользователю нужно читать файл
//— В обработчиках создания, обновления и удаления нужно файл читать, чтобы убедиться, что пользователь существует, //а затем сохранить в файл, когда внесены изменения
//— Не забывайте про JSON.parse() и JSON.stringify() - эти функции помогут вам переводить объект в строку и //наоборот.

const express = require('express');

const app = express();



const fs = require("fs"); 


 


app.use(express.json());

app.get('/users', (req, res) =>{
   var data = fs.readFileSync('data.json');
   var users = JSON.parse(data); 
  
   
 res.send({users});
 
 console.log(users);

 
});

app.get('/users/:id', (req, res) =>{

   var data = fs.readFileSync('data.json');
   var users = JSON.parse(data); 
   
   
  const user = users.find((user) => user.id === Number(req.params.id));

  if (user ) {
     res.send({user });
     console.log(user);
  } else {
     res.status(404);
     res.send({user: null});
     console.log("User not found");
  }
 });

app.post('/users', (req, res) =>{

  
   var data = fs.readFileSync('data.json');
   var users = JSON.parse(data); 
   console.log(users);
   
   
   let uniqueID = users.length;
   console.log(uniqueID);
  
uniqueID +=1;

   users.push({
    id:uniqueID,
    ...req.body
   })
    
   res.send({
        id:uniqueID,
        
    });

   
    

    users.forEach((user) => {
        let newUser = user;       
        let newUsers = JSON.stringify(users);
        

        fs.writeFile("data.json", newUsers, (err) => { 
           if (err) throw err; 
            console.log("New data added"); 
          }); 

      });

});


app.put('/users/:id', (req, res) =>{

   var data = fs.readFileSync('data.json');
   var users = JSON.parse(data); 
  
   
  const user  = users.find((user) => user.id === Number(req.params.id));

  if (user) {
      user.name = req.body.name;
      user.surname = req.body.surname;     
     res.send({user});
     console.log(user);
  } else {
     res.status(404);
     res.send({user: null});
     console.log('User not found')
  }

 

   const itemToReplace = users.find(item => {
    if (item.id === user.id) {
        item.name = user.name;
        item.surname = user.surname;
        return true;
    }
});


let updatedUsers = JSON.stringify(users);

fs.writeFile("data.json", updatedUsers, (err) => {   
  if (err) throw err; 
  console.log("User data changed"); 
}); 

 });

 app.delete('/users/:id', (req, res) =>{
   var data = fs.readFileSync('data.json');
   var users = JSON.parse(data);    
   const user  = users.find((user) => user.id === Number(req.params.id));
 
   if (user) {
      const userIndex = users.indexOf(user);
      users.splice(userIndex, 1);
            
      res.send({user});
      
      
   } else {
res.status(404);
      res.send({user: null});
   }
   

   users.forEach((user) => {
      
   let  indexOfuser = users.indexOf(user);
   
      user.id = indexOfuser +1;
      console.log(users);
     
      let newUsers1 = JSON.stringify(users);
      console.log(newUsers1);

      fs.writeFile("data.json", newUsers1, (err) => { 
         if (err) throw err; 
         console.log("Data modified"); 
       }); 

    });

  
   
  });


app.listen(3000);

  