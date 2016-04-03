'use strict';

import Matrix from '../math/Matrix.js';
import {LinEquationsSystem} from '../math/LinEquationsSystem.js';

var eqSysLeftSymbol = Symbol('linEquationSystemLeft'),
    eqSysVariablesSymbol = Symbol('linEquationSystemVariables'),
    eqSysRightSymbol = Symbol('linEquationSystemRight'),
    eqSysOperatorsSymbol = Symbol('linEquationSystemOperators'),
    eqSysVariablesCondSymbol = Symbol('linEquationSystemVariablesConditions'),
    objectiveFunctionSymbol = Symbol('objectiveFunction'),
    destinationSymbol = Symbol('destination'),
    linEqSystemSymbol = Symbol('linEqSystem');

export class OptimizationProblem {
    constructor(linEquationSystemLeft,
                linEquationSystemVariables,
                linEquationSystemRight,
                linEquationSystemOperators,
                linEquationSystemVariablesCond,
                objectiveFunction,
                destination) {

        this[eqSysLeftSymbol] = linEquationSystemLeft;
        this[eqSysVariablesSymbol] = linEquationSystemVariables;
        this[eqSysRightSymbol] = linEquationSystemRight;
        this[eqSysOperatorsSymbol] = linEquationSystemOperators;
        this[eqSysVariablesCondSymbol] = linEquationSystemVariablesCond;
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

    transformToDualProblem() {
        let m = this[eqSysLeftSymbol].m,
            n = this[eqSysLeftSymbol].n,
            defaultInequalitySign = this[destinationSymbol] === 'min' ? '>=' : '<=',
            defaultInequalitySignForDualProblem = defaultInequalitySign === '<=' ? '>=' : '<=',

            dpEgSystemLeft = this[eqSysLeftSymbol].transpose(),
            dpEgSystemVariables = this.getDPEqSystemVariables(m),
            dpEgSystemRight = this[objectiveFunctionSymbol].transpose(),

            dpEgSystemOperators = new Matrix(n, 1),
            dpEgSystemCond = new Matrix(m, 1),

            dpObjectiveFunction = this[eqSysRightSymbol],
            dpDestination = this[destinationSymbol] === 'min' ? 'max' : 'min';

        for (let i = 0; i < this[eqSysOperatorsSymbol].m; ++i) {
            let eqSysOperator = this[eqSysOperatorsSymbol].getEl(i, 0),
                dpEgSystemSingleCon;

            if (eqSysOperator === '=') {
                dpEgSystemSingleCon = 'R';
            } else if (eqSysOperator === defaultInequalitySign) {
                dpEgSystemSingleCon = '>=0';
            } else {
                dpEgSystemSingleCon = '<=0';
            }

            dpEgSystemCond.setEl(i, 0, dpEgSystemSingleCon);
        }

        for (let i = 0; i < this[eqSysVariablesCondSymbol].m; ++i) {
            let eqSysVariableCond = this[eqSysVariablesCondSymbol].getEl(i, 0),
                dpEgSysOperatorSymbol;

            if (eqSysVariableCond === '>=0' || eqSysVariableCond === 'R') {
                dpEgSysOperatorSymbol = defaultInequalitySignForDualProblem;
            } else if (eqSysVariableCond === '=0') {
                dpEgSysOperatorSymbol = '=';
            } else {
                dpEgSysOperatorSymbol = defaultInequalitySignForDualProblem === '>=' ? '<=' : '>=';
            }

            dpEgSystemOperators.setEl(i, 0, dpEgSysOperatorSymbol);
        }


        this[eqSysLeftSymbol] = dpEgSystemLeft;
        this[eqSysVariablesSymbol] = dpEgSystemVariables;
        this[eqSysRightSymbol] = dpEgSystemRight;
        this[eqSysOperatorsSymbol] = dpEgSystemOperators;
        this[eqSysVariablesCondSymbol] = dpEgSystemCond;
        this[objectiveFunctionSymbol] = dpObjectiveFunction;
        this[destinationSymbol] = dpDestination;
    }

    getDPEqSystemVariables(mainEqSystemEquationsNo) {
        let dpEgSystemVariables = new Matrix(mainEqSystemEquationsNo, 1);

        for (let i = 0; i < dpEgSystemVariables.m; ++i) {
            dpEgSystemVariables.setEl(i, 0, 'y' + (i + 1));
        }

        return dpEgSystemVariables;
    }

//     "main_equation_system_left": {
//     "main_equation_system_right": {
//     "main_equation_system_operators": {
//     "main_equation_system_variables": {
//     "main_equation_system_variables_signs_conditions": {
//     "obj_fun": {
//     "obj_fun_destination": "min"
    getOptimizationProblemDataObj() {
        let me = this;

        return {
            main_equation_system_left: me[eqSysLeftSymbol].getMatrixDataObj(),
            main_equation_system_variables: me[eqSysVariablesSymbol].getMatrixDataObj(),
            main_equation_system_right: me[eqSysRightSymbol].getMatrixDataObj(),
            main_equation_system_operators: me[eqSysOperatorsSymbol].getMatrixDataObj(),
            main_equation_system_variables_signs_conditions: me[eqSysVariablesCondSymbol].getMatrixDataObj(),
            objective_fun: me[objectiveFunctionSymbol].getMatrixDataObj(),
            obj_fun_destination: me[destinationSymbol]
        };
    }
}