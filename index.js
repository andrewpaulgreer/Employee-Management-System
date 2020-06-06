const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

  function start(){
      inquirer.prompt ({
          name: "selections",
          type: "list",
          message: "What would you like to do?",
          choices: ["View All Employees", "View All Departments", "View All Roles", "Add Departments", "Add Role", "add Employees", "Update Employee Roles", "Update employee managers", "View employees by manager", "Delete departments", "Delete roles", "Delete employees", "View Budget"]
      })
      .then(function(answer) {
          if(answer.selections === "View All Employees"){
              viewEmployees();
          } else if (answer.selections === "View All Departments"){
            viewDepartments();
          } else if (answer.selections === "View All Roles"){
              viewRoles();
           } else if (answer.selections === "Add Departments"){
             addDepartment();
            } else if (answer.selections === "Add Role"){             
            addrole();
            } else if (answer.selections === "add Employees"){
            addEmployee();
            } else  (answer.selections === "Update Employee Roles")
             updateRole(); 
            
            // } else if (answer.selections === "Update employee managersr"){
            
            // } else if (answer.selections === "View employees by manager"){             
            
            // } else if (answer.selections === "View employees by manager"){
            
            // } else if (answer.selections === "Delete departments"){
            
            // } else if (answer.selections === "Delete roles"){
              
            // } else if (answer.selections === "Delete employees"){
              
            // } else (answer.selections === "View Budget"){

            // }
              
        });
  }

 let viewEmployees = () => {
      console.log("selecting employees \n");
        connection.query("SELECT * FROM employee", function(err, res){
            if (err) throw err;
            console.table(res)
            start();
        })
       
  }

  let viewDepartments = () => {
    console.log("selecting employees \n");
      connection.query("SELECT * FROM department", function(err, res){
          if (err) throw err;
          console.table(res)
          start();
      })
     
}

let viewRoles = () => {
    console.log("selecting employees \n");
      connection.query("SELECT * FROM role", function(err, res){
          if (err) throw err;
          console.table(res)
          start();
      })
      
}

let addDepartment = () => {
 inquirer.prompt([
     {
     name: "addDep",
     type: "input",
     message: "please add in a new department to add",
     validate: (response) => {
        if (response !== "") {
          //entered in validaiton so the return msut be a string
          return true;
        } else {
          return "please enter a valid charater input";
        }
      },
    }
    ])
    .then (function(answer){
       connection.query(
            "INSERT INTO department SET ?",
            {
              name:  answer.addDep
            },
            function(err){
                if (err) throw err;
                console.log("The new department has been added successfully")
                start();
            }
        )
    })
     
}

let addrole = () => {
    inquirer.prompt([
        {
        name: "addtitle",
        type: "input",
        message: "please add in a new Job Title",
        validate: (response) => {
           if (response !== "") {
             //entered in validaiton so the return msut be a string
             return true;
           } else {
             return "please enter a valid charater input";
           }
         },
       },
       {
        name: "addsalary",
        type: "input",
        message: "please add in "
       }
       ])
       .then (function(answer){
          connection.query(
               "INSERT INTO department SET ?",
               {
                 name:  answer.addDep
               },
               function(err){
                   if (err) throw err;
                   console.log("The new department has been added successfully")
                   start();
               }
           )
       })
        
   }
   

