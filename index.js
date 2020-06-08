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
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  inquirer
    .prompt({
      name: "selections",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Departments",
        "Add Role",
        "add Employees",
        "Update Employee Roles",
        "Update employee managers",
        "View employees by manager",
        "Delete departments",
        "Delete roles",
        "Delete employees",
        "View Budget",
        "Quit"
      ],
    })
    .then(function (answer) {
      if (answer.selections === "View All Employees") {
        viewAll();
      } else if (answer.selections === "View All Departments") {
        viewDepartments();
      } else if (answer.selections === "View All Roles") {
        viewRoles();
      } else if (answer.selections === "Add Departments") {
        addDepartment();
      } else if (answer.selections === "Add Role") {
        addRole();
      } else if (answer.selections === "add Employees") {
        addEmployee();
      } else if (answer.selections === "Update Employee Roles") {
      updateRole();
      } else if (answer.selections === "Quit"){
       quitApp(); 
      }
      // } else if (answer.selections === "Update employee managersr"){

      // } else if (answer.selections === "View employees by manager"){

      // } else if (answer.selections === "Delete departments"){

      // } else if (answer.selections === "Delete roles"){

      // } else if (answer.selections === "Delete employees"){

      // } else (answer.selections === "View Budget"){

      // }
    });
}

//  let viewEmployees = () => {
//       console.log("selecting employees \n");
//         connection.query("SELECT employee.id, first_name, last_name, role_id, manager_id FROM employee JOIN role ON (employee.role_id = role.id) JOIN department ON (department.id = role.department_id)", function(err, res){
//             if (err) throw err;
//             console.table(res)
//             start();
//         })

//   }

let viewDepartments = () => {
  console.log("selecting employees \n");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

let viewRoles = () => {
  console.log("selecting employees \n");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

let viewAll = () => {
  let allArr = [];
  let query =
    "SELECT employee.id, first_name, last_name, role_id, manager_id, title, salary, name FROM employee JOIN role ON (employee.role_id = role.id) JOIN department ON (department.id = role.department_id)";
  connection.query(query, function (err, result) {
    if (err) throw err;

    let employeeArr = [];


    for (var i = 0; i < result.length; i++) {
      employeeArr = [];
        
      employeeArr.push(result[i].id);
      employeeArr.push(result[i].first_name);
      employeeArr.push(result[i].last_name);
      employeeArr.push(result[i].title);
      employeeArr.push(result[i].salary);
      employeeArr.push(result[i].name);
    
      allArr.push(employeeArr);
    }
    console.log("\n\n");
    console.table(allArr);

    start();
  });
};

let addDepartment = () => {
  inquirer
    .prompt([
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
      },
    ])
    .then(function (answer) {
      console.log("adding department \n");
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.addDep,
        },
        function (err) {
          if (err) throw err;
          console.log("The new department has been added successfully");
          viewDepartments();
          start();
        }
      );
    });
};

let addRole = () => {
  inquirer
    .prompt([
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
        message: "please add a salary for this position",
        validate: (response) => {
          // created Validation so the user must input a number
          const valid = response.match(/^[1-9]\d*$/); // this syntax for the match took a while to reasearch/ get right
          if (valid) {
            return true;
          } else {
            return "You must enter a number between 1-10";
          }
        },
      },
      {
        name: "addid",
        type: "input",
        message: "Please add in a department ID",
        validate: (response) => {
          // created Validation so the user must input a number
          const valid = response.match(/^[1-9]\d*$/); // this syntax for the match took a while to reasearch/ get right
          if (valid) {
            return true;
          } else {
            return "You must enter a number between 1-10";
          }
        },
      },
    ])
    .then(function (answer) {
      console.log("adding new role \n");
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.addtitle,
          salary: answer.addsalary,
          department_id: answer.addid,
        },
        function (err) {
          if (err) throw err;
          console.log("The new department has been added successfully");
          viewRoles();
          start();
        }
      );
    });
};

let addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "addfirst",
        type: "input",
        message: "please insert a First Name",
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
        name: "addlast",
        type: "input",
        message: "please insert a last name",
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
        name: "addroleid",
        type: "input",
        message: "please add the corresponding role ID",
        validate: (response) => {
          // created Validation so the user must input a number
          const valid = response.match(/^[1-9]\d*$/); // this syntax for the match took a while to reasearch/ get right
          if (valid) {
            return true;
          } else {
            return "You must enter a number between 1-10";
          }
        },
      },
      {
        name: "addmanagerid",
        type: "input",
        message: "Please add in a manager ID",
        validate: (response) => {
          // created Validation so the user must input a number
          const valid = response.match(/^[1-9]\d*$/); // this syntax for the match took a while to reasearch/ get right
          if (valid) {
            return true;
          } else {
            return "You must enter a number between 1-10";
          }
        },
      },
    ])
    .then(function (answer) {
      console.log("adding new Employee \n");
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.addfirst,
          last_name: answer.addlast,
          role_id: answer.addroleid,
          manager_id: answer.addmanagerid,
        },
        function (err) {
          if (err) throw err;
          console.log("The new department has been added successfully");
          viewAll();
          start();
        }
      );
    });
};

let updateRole = () => {
  connection.query(
    "SELECT employee.id, first_name, last_name, role_id, manager_id, title, salary, name FROM employee JOIN role ON (employee.role_id = role.id) JOIN department ON (department.id = role.department_id)",
    function (err, res) {
      if (err) throw err;   
  inquirer.prompt([
    {
      name: "chooseName",
      type: "rawlist",
      message: "please choose whose role you would like to update?",
      choices: function () {
          const nameArray = [];
          for (let i = 0; i < res.length; i++){
              nameArray.push(res[i].first_name)
             
          }
          return nameArray;
      }
    },
    {
        name: "chooseRole",
        type: "rawlist",
        message: "please choose which role you would like to update to?",
        choices: function () {
            const rolesArr = [];
            for (let i = 0; i < res.length; i++){
                rolesArr.push(res[i].title)
               
            }
            return rolesArr;
        }
      }

  ]).then(function(answer){
    let chosenRole;
    for (let i = 0; i< res.length; i++){
    if (res[i].title === answer.chooseRole){
        chosenRole = res[i];
    }
    }
     connection.query("UPDATE employee ? WHERE ? SET ?",
    [
        {
            first_name: answer.chooseName
        },
        {
            id: chosenRole.role_id
        },
        {
            title: chosenRole.title
        }
    ],
    function(err, result){
        if (err) throw err
        viewAll();
        start();
    }
    )
  })
});
};

let quitApp = () => {
inquirer.prompt({
type: "list",
name: "quit",
message: "Are you sure you want to quit?",
choices: ["Quit", "Rerun"]
}).then (function (response){
    if (response.quit === "Quit"){
        connection.end();
    } else {
        start();
    }
})
}