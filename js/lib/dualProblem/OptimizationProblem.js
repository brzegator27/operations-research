'use strict';

// import Matrix from '../math/Matrix.js';
import {LinEquationsSystem} from '../math/LinEquationsSystem.js';

var eqSysLeftSymbol = Symbol('linEquationSystemLeft'),
    eqSysVariablesSymbol = Symbol('linEquationSystemVariables'),
    eqSysRightSymbol = Symbol('linEquationSystemRight'),
    eqSysOperatorsSymbol = Symbol('linEquationSystemOperators'),
    objectiveFunctionSymbol = Symbol('objectiveFunction'),
    destinationSymbol = Symbol('destination'),
    linEqSystemSymbol = Symbol('linEqSystem');

export class OptimizationProblem {
    constructor(linEquationSystemLeft,
                linEquationSystemVariables,
                linEquationSystemRight,
                linEquationSystemOperators,
                objectiveFunction,
                destination) {

        this[eqSysLeftSymbol] = linEquationSystemLeft;
        this[eqSysVariablesSymbol] = linEquationSystemVariables;
        this[eqSysRightSymbol] = linEquationSystemRight;
        this[eqSysOperatorsSymbol] = linEquationSystemOperators;
        this[objectiveFunctionSymbol] = objectiveFunction;
        this[destinationSymbol] = destination;

        // (A, x, b, signs)
        this[linEqSystemSymbol] = new LinEquationsSystem(
            this[eqSysLeftSymbol],
            this[eqSysVariablesSymbol],
            this[eqSysRightSymbol],
            this[eqSysOperatorsSymbol]);

        console.log(this[linEqSystemSymbol]);
    }
}