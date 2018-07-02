const math = require('mathjs')
const chalk = require('chalk')

/**
 * 
 * @param {string} equation The equation being solved
 * @param {object} scope The scope for the math lib
 * @param {number} left The left limit of the interval
 * @param {number} right The right limit of the interval
 * @param {number} stepSize The step limit with which to increase/decrease the interval
 * @param {number} ctr Counter variable  
 */
const findInterval = ({ eqn, scope, left, right, stepSize, ctr = 0 }) => {
  while (math.eval(eqn, { x: left }) * math.eval(eqn, { x: right }) >= 0 && ctr++ < 100) {
    left -= stepSize
    right += stepSize
  }
  if (ctr >= 100) {
    throw new Error(`Could not find the interval within ${ctr} iterations`)
  }
  return { left, right }
}

/**
 * 
 * @param {string} eqn
 * @param {number} left
 * @param {number} right 
 */
const recursiveSubroutine = ({ eqn, left, right }) => {
  while (right - left > Math.exp(-15)) {
    let mid = (left + right) / 2
    let f_mid = math.eval(eqn, { x: mid })
    let f_left = math.eval(eqn, { x: left })
    if (f_left * f_mid > 0) {
      left = mid
    } else {
      right = mid
    }
  }
  return ((right + left) / 2)
}

/**
 * Use the bisection method to find the roots of an equation
 * 
 * @param {string} eqn The equation that is being solved
 * @param {string} variable The variable that is being solved for
 */
module.exports = ({ eqn, variable, scope }) => {
  console.log(chalk.red("Running Bisection method for equation: ", eqn))
  let start = process.hrtime()
  const { left, right } = findInterval({ eqn, scope, left: 0, right: 0, stepSize: 0.5 })
  const result = recursiveSubroutine({ eqn, left, right })
  let end = process.hrtime(start)
  console.log(chalk.red(result))
  console.log(chalk.red(`Execution time: ${chalk.red(end[0])}s ${chalk.red(end[1]/1000000)}ms`))
}