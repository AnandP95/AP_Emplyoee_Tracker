const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const figlet = require('figlet');
require('dotenv').config();
const choices = [
  'View all departments',
  'Add a department',
  'View all roles',
  'Add a role',
  'View all employees',
  'Add an employee',
  'Update an employee role',
  'Exit'
];

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};

async function startApp() {
  try {
    const db = await mysql.createConnection(config);

    console.log(`Connected to the employee_db database.\n`);
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
          const [departments] = await db.query('SELECT * FROM department');
          console.table(departments);
          break;

        case 'Add a department':
          const deptAnswer = await inquirer.prompt({
            type: 'input',
            message: 'What is the name of the department?',
            name: 'deptName'
          });

          await db.query('INSERT INTO department (name) VALUES (?)', [deptAnswer.deptName]);
          console.log('Department added successfully!');
          break;

        case 'View all roles':
          const [roles] = await db.query('SELECT * FROM role');
          console.table(roles);
          break;

        case 'Add a role':
          const roleAnswers = await inquirer.prompt([
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
            roleAnswers.roleName,
            roleAnswers.salary,
            roleAnswers.departmentId,
          ]);
          console.log('Role added successfully!');
          break;

        case 'View all employees':
          const [employees] = await db.query(`
  SELECT 
    e.id AS Employee_ID,
    e.first_name AS First_Name,
    e.last_name AS Last_Name,
    r.title AS Job_Title,
    d.name AS Department,
    r.salary AS Salary,
    CONCAT(m.first_name, ' ', m.last_name) AS Manager
  FROM employee e
  LEFT JOIN role r ON e.role_id = r.id
  LEFT JOIN department d ON r.department_id = d.id
  LEFT JOIN employee m ON e.manager_id = m.id
`);

console.table(employees);

break;
        case 'Add an employee':
          const employeeAnswers = await inquirer.prompt([
            {
              type: 'input',
              message: 'What is the first name of the employee?',
              name: 'empFname',
            },
            {
              type: 'input',
              message: 'What is the last name of the employee?',
              name: 'empLname',
            },
            {
              type: 'number',
              message: 'What is the role ID for an employee?',
              name: 'roleId',
            },
            {
              type: 'number',
              message: 'What is the manager ID for an employee?',
              name: 'managerId',
            },
          ]);

          await db.query('INSERT INTO employee (first_name, last_name, role_id , manager_id) VALUES (?, ?, ? , ?)', [
            employeeAnswers.empFname,
            employeeAnswers.empLname,
            employeeAnswers.roleId,
            employeeAnswers.managerId,
          ]);
          console.log('Employee added successfully!');
          break;

          case 'Update an employee role':
            {
              // Fetch employees from the database to populate choices
              const [employees] = await db.query('SELECT id, first_name, last_name FROM employee');
          
              const employeeChoices = employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
              }));
          

              const [roles] = await db.query('SELECT id, title FROM role');

              const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id,
              }));



              const updateAnswers = await inquirer.prompt([
                {
                  type: 'list',
                  message: 'Which employee would you like to update?',
                  name: 'employee_id',
                  choices: employeeChoices,
                },
                {
                  type: 'list',
                  message: 'Enter the new role for the employee:',
                  name: 'role_id',
                  choices: roleChoices,
                },
              ]);

          
              await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [updateAnswers.role_id, updateAnswers.employee_id]);
              console.log('Employee role updated successfully!');
              break;
            }
          

        case 'Exit':
          console.log('Exiting...');
          await db.end();
          return;

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
