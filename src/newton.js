const math = require('mathjs')
const chalk = require('chalk')

/**
 * The subroutine for newton's method
 * 
 * @param {string} f The original function 
 * @param {object} fp The derivative of the original function
 * @param {number} guess The initial guess supplied
 * @param {number} maxIter The max number of iterations to run for
 * @param {number} curr The current iteration
 * @param {object} scope The scope object for the math lib
 */
const recursiveSubRoutine = ({ f, fp, guess, maxIter, curr, scope, variable }) => {
    while (curr < maxIter) {
        scope[variable] = guess
        let result = guess - (math.eval(f, scope)) / (fp.eval(scope))
        if (Math.abs(result - guess) < Math.exp(-15)) {
            return result
        }
        guess = result
        curr++
    }
    return null
}

/**
 * Use Newton's method to solve for the roots of an equation
 * 
 * @param {string} eqn The equation that is being solved
 * @param {string} variable The variable that is being solved for
 * @param {object} scope The scope object for math evaluation
 * @param {number} guess The initial guess supplied
 */
module.exports = ({ eqn, variable, scope, guess }) => {
    console.log(chalk.blue("Running Newton's method for equation: ", eqn))
    let start = process.hrtime()
    const der = math.derivative(eqn, variable)
    const result = recursiveSubRoutine({ f: eqn, fp: der, guess, maxIter: 40, curr: 0, scope, variable })
    let end = process.hrtime(start)
    console.log(chalk.blue(result))
    console.log(chalk.blue(`Execution time: ${chalk.blue(end[0])}s ${chalk.blue(end[1]/1000000)}ms`))
}

