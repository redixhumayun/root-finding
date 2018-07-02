const math = require('mathjs')
const newton = require('./src/newton')
const bisection = require('./src/bisection')

const equation = '1550 - (4*segH/K * sinh(K/2 * span / (2*segH)))'
const simpleEquation = '-2x^2+3x+5'
newton({ eqn: simpleEquation, variable: 'x', scope: { x: 1 }, guess: 3 })
bisection({ eqn: simpleEquation, variable: 'x', scope: { x: 1 }, guess: 3})