const inquirer = require('inquirer');
const mysql = require('mysql2/promise'); // Use mysql2/promise for async/await support
const figlet = require('figlet');
const { viewTable, addDepartment, addRole, addEmployee, updateEmployee } = require('./databaseActions');

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
          await viewTable(db, 'departments');
          break;
        case 'Add a department':
          await addDepartment(db);
          break;
        case 'View all roles':
          await viewTable(db, 'roles');
          break;
        case 'Add a role':
          await addRole(db);
          break;
        case 'View all employees':
          await viewTable(db, 'employees');
          break;
        case 'Add an employee':
          await addEmployee(db);
          break;
        case 'Update an employee role':
          await updateEmployee(db);
          break;
        default:
          console.log('Invalid choice. Please try again.');
          break;
      }
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

startApp();

