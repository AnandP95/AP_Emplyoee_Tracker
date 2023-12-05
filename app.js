const inquirer = require('inquirer');
const mysql = require('mysql2/promise'); 
const figlet = require('figlet');

const choices = [
  'View all departments',
  'Add a department',
  'View all roles',
  'Add a role',
  'View all employees',
  'Add an employee',
  'Update an employee role',
];

async function startApp() {
  try {
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '590route3',
      database: 'employee_Tr_db'
    });

    console.log(`Connected to the employeeTracker_db database.\n`);
    console.log(figlet.textSync('Employee Tracker'));

    while (true) {
      const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: choices,
      });

      switch (action) {
        case 'View all departments':
  {
    const [department] = await db.query('SELECT * FROM department');
    console.table(department);
  }
  break;
  case 'Update an employee role':
    await updateEmployeeRole(db);
    break;

// Update the 'Add a department' case
case 'Add a department':
  {
    const answer = await inquirer.prompt({
      type: 'input',
      message: 'What is the name of the department?',
      name: 'deptName'
    });

    await db.query('INSERT INTO department (name) VALUES (?)', [answer.deptName]);
    console.log('Department added successfully!');
  }
  break;

// Update the 'View all roles' case
case 'View all roles':
  {
    const [roles] = await db.query('SELECT * FROM role');
    console.table(roles);
  }
  break;

  case 'Add a role':
    {
      const answers = await inquirer.prompt([
       
        {
          type: 'input',
          message: 'What is the name of the role?',
          name: 'roleName',
        },
       
        {
          type: 'number',
           message: 'What is the salary for this role?',
          name: 'salary',
        },
       
        {
          type: 'number',
           message: 'What is the department ID for this role?',
           name: 'departmentId',
        },
      ]);
  
      await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [
        answers.roleName,
        answers.salary,
        answers.departmentId,
      ]);
      console.log('Role added successfully!');
    }
    break;



// Update the 'View all employees' case
case 'View all employees':
  {
    const [employees] = await db.query('SELECT * FROM employee');
    console.table(employees);
  }
  break;



  case 'Add an employee':
    {
      const answers = await inquirer.prompt([
       
        {
          type: 'input',
          message: 'What is the  first name of the employee?',
          name: 'empFname',
        },
       
        {
          type: 'input',
           message: 'What is the last name of the employee?',
          name: 'empLname',
        },
       
        {
          type: 'number',
           message: 'What is the role id for an employee?',
           name: 'roleId',
        },

        {
          type: 'number',
           message: 'What is the manager id for an employee?',
           name: 'managerId',
        },
      ]);
  
      await db.query('INSERT INTO employee (first_name, last_name, role_id , manager_id) VALUES (?, ?, ? , ?)', [
        answers.empFname,
        answers.empLname,
        answers.roleId,
        answers.managerId,
      ]);
      console.log('employees added successfully!');
    }
    break;





const updateEmployeeRole = async (db) => {
      try {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            message: 'Which employee would you like to update?',
            name: 'empUpdate',
          },
          {
            type: 'number',
            message: 'What do you want to update their role to?',
            name: 'updateRole',
          },
        ]);
    
        const employeeId = answers.empUpdate;
        const roleId = answers.updateRole;
    
        // Update the employee's role in the database
        await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
    
        console.log('Employee role updated successfully!');
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    };
    







   
    




      }
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}


startApp();
