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

// Update the 'View all employees' case
case 'View all employees':
  {
    const [employees] = await db.query('SELECT * FROM employee');
    console.table(employees);
  }
  break;
      }
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}


startApp();
