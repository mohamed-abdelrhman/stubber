const {graph} = require("./graph/graph");
const {microService} = require("./micro-service/micro-service");
const {rest} = require("./rest/rest");


const cli = require('clui')
const shell = require('shelljs')
const Spinner = cli.Spinner
const clear = require('clear')
const spawn = require('child_process').spawn
const chalk = require('chalk')
const inquirer = require('inquirer')
const figlet = require('figlet')
const config = require('./config')

const installHelper = (command, onSuccess, spinner) => {
  return new Promise((resolve, reject) => {
    var process = spawn(command, { shell: true })
    spinner.start()
    process.on('exit', () => {
      spinner.stop()
      onSuccess()
      resolve()
    })
  })
}
const installPrettier = async () => {
  const spinner = new Spinner('Installing Prettier...')
  return installHelper(
    'yarn add -D prettier',
    () => console.log(chalk.green('Prettier has been installed! 👍')),
    spinner
  )
}
const askInfo = () => {
  const questions = [
    {
      name: 'moduleName',
      type: 'input',
      message: ' What name would you like to use for this resource ?',
      filter: function(val) {
        return val ;
      },
    },
    {
      name: 'orm',
      type: 'list',
      choices: ['TypeOrm'],
      message: 'Please, Select the Orm package that you are using?',
      filter: function(val) {
        return val ;
      },
    },
    {
      name: 'transportLayer',
      type: 'list',
      choices: ['Graphql', 'Microservice','REST'],
      message: 'What transport layer do you use?',
      filter: function(val) {
        return val ;
      },
    },
    {
      name: 'crud',
      type: 'confirm',
      message: ' Would you like to generate CRUD entry points?',
      filter: function(val) {
        return val ;
      },
    },
    {
      name: 'spec',
      type: 'confirm',
      message: ' Would you like to generate .spec Files?',
      filter: function(val) {
        return val ;
      },
    },
  ]
  return inquirer.prompt(questions)
}

const init = async () => {
  clear()
  console.log(
    chalk.green(
      figlet.textSync('Stubber', {
        horizontalLayout: 'full',
      })
    )
  )
}
const success = () => {
  // console.log(chalk.blue.bold(`Stubber Resource completed`))
};


(async () => {
  await init()
  const answer = await askInfo()
  const { transportLayer } = answer
  if (transportLayer ==='Graphql' ) {
    await graph.call(answer)
  }else if (transportLayer ==='Microservice'){
    await microService.call(answer)
  }else if (transportLayer === "REST"){
    await rest.call(answer)
  }


  success()
})()



