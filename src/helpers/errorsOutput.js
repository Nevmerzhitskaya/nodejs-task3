const errorConsole = (error, errorMessage) => {
  console.log(`\u001B[31m${error}:\u001B[0m ${errorMessage}`);
}

export default errorConsole;