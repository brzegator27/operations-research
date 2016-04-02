'use strict';

import Matrix from '../math/Matrix.js';

var eqSysLeftSymbol = Symbol('linEquationSystemLeft'),
    eqSysRightSymbol = Symbol('linEquationSystemRight'),
    eqSysOperatorsSymbol = Symbol('linEquationSystemOperators'),
    objectiveFunctionSymbol = Symbol('objectiveFunction'),
    destinationSymbol = Symbol('destination');

export class OptimizationProblem {
    constructor(linEquationSystemLeft,
                linEquationSystemRight,
                linEquationSystemOperators,
                objectiveFunction,
                destination) {

        this[eqSysLeftSymbol] = linEquationSystemLeft.transpose();
        this[eqSysRightSymbol] = linEquationSystemRight;
        this[eqSysOperatorsSymbol] = linEquationSystemOperators;
        this[objectiveFunctionSymbol] = objectiveFunction;
        this[destinationSymbol] = destination;
    }
}