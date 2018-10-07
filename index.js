const math = require('mathjs')
const newton = require('./src/newton')
const bisection = require('./src/bisection')
const brents = require('./src/brents')

const equation = '1550 - (4*segH/K * sinh(K/2 * span / (2*segH)))'
const simpleEquation = '-2x^2+3x+5'

// newton({ eqn: equation, variable: 'segH', scope: { K: 0.022, span: 1500, segH: 1 }, guess: Math.random() * 1000 })
// bisection({ eqn: equation, variable: 'segH', scope: { K: 0.022, span: 1500, segH: 1 }, guess: Math.random() * 1000 })
// brents((Math.pow(x,2)-1)*x - 5, 2, 3, 0.0001, 100)


newton({ eqn: simpleEquation, variable: 'x', scope: { x: 1 }, guess: 10 })
bisection({ eqn: simpleEquation, variable: 'x', scope: { x: 1 }, guess: 10})