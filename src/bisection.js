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
const findInterval = ({ eqn, scope, variable, left, right, stepSize, ctr = 0 }) => {
  let scope_left = Object.assign({}, {...scope})
  let scope_right = Object.assign({}, {...scope})
  scope_left[variable] = left
  scope_right[variable] = right

  let result_left = math.eval(eqn, scope_left)
  let result_right = math.eval(eqn, scope_right)

  while (math.eval(eqn, scope_left) * math.eval(eqn, scope_right) >= 0 && ctr++ < 300) {
    left -= stepSize
    right += stepSize
    scope_left[variable] = left
    scope_right[variable] = right
    result_left = math.eval(eqn, scope_left)
    result_right = math.eval(eqn, scope_right)
    if (Number.isNaN(result_left)) {
      left -= stepSize
      scope_left[variable] = left
      result_left = math.eval(eqn, scope_left)
    } if (Number.isNaN(result_right)) {
      right += stepSize
      scope_right[variable] = right
      scope_right = math.eval(eqn, scope_right)
    }
  }
  if (ctr >= 300) {
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
const recursiveSubroutine = ({ eqn, left, right, scope, variable }) => {
  while (right - left > Math.exp(-15)) {
    let mid = (left + right) / 2
    scope[variable] = mid
    let f_mid = math.eval(eqn, scope)
    scope[variable] = left
    let f_left = math.eval(eqn, scope)
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
module.exports = ({ eqn, variable, scope, guess }) => {
  console.log(chalk.red("Running Bisection method for equation: ", eqn))
  let start = process.hrtime()
  const { left, right } = findInterval({ eqn, scope, variable, left: guess, right: guess, stepSize: 0.5 })
  const result = recursiveSubroutine({ eqn, left, right, scope, variable })
  let end = process.hrtime(start)
  console.log(chalk.red(result))
  console.log(chalk.red(`Execution time: ${chalk.red(end[0])}s ${chalk.red(end[1]/1000000)}ms`))
}