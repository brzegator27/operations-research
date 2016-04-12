'use strict';

import Matrix from '../math/Matrix.js';
import {OptimizationProblem} from './OptimizationProblem.js'


//     "main_equation_system_left": {
//     "main_equation_system_right": {
//     "main_equation_system_operators": {
//     "main_equation_system_variables": {
//     "main_equation_system_variables_signs_conditions": {
//     "obj_fun": {
//     "obj_fun_destination": "min"
export class OptimizationProblemReader {
    static getDualProblemFromJsonDataObj(JsonObj) {

    }

    getPrimeProblemFromJsonDataObj(jsonObj) {
        let eqSysLeft = jsonObj.main_equation_system_left,
            eqSysVariables = jsonObj.main_equation_system_variables,
            eqSysRight = jsonObj.main_equation_system_right,
            eqSysOperators = jsonObj.main_equation_system_operators,
            eqSysVariablesCond = jsonObj.main_equation_system_variables_signs_conditions,
            objectiveFn = jsonObj.objective_fun,
            destination = jsonObj.obj_fun_destination,
            eqSysLeftMatrix = new Matrix(eqSysLeft),
            eqSysVariablesMatrix = new Matrix(eqSysVariables),
            eqSysRightMatrix = new Matrix(eqSysRight),
            eqSysOperatorsMatrix = new Matrix(eqSysOperators, {
                nonNumeric: true
            }),
            eqSysVariablesCondMatrix = new Matrix(eqSysVariablesCond),
            objectiveFnMatrix = new Matrix(objectiveFn);

        return new OptimizationProblem(
            eqSysLeftMatrix,
            eqSysVariablesMatrix,
            eqSysRightMatrix,
            eqSysOperatorsMatrix,
            eqSysVariablesCondMatrix,
            objectiveFnMatrix,
            destination);
    }
}
