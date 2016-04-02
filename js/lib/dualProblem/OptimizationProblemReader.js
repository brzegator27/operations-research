'use strict';

import Matrix from '../math/Matrix.js';
import {OptimizationProblem} from './OptimizationProblem.js'


//     "main_equation_system_left": {
//     "main_equation_system_right": {
//     "main_equation_system_operators": {
//     "obj_fun": {
//     "obj_fun_destination": "min"
export class OptimizationProblemReader {
    static getDualProblemFromJsonDataObj(JsonObj) {

    }

    getPrimeProblemFromJsonDataObj(jsonObj) {
        let eqSysLeft = jsonObj.main_equation_system_left,
            eqSysRight = jsonObj.main_equation_system_right,
            eqSysOperators = jsonObj.main_equation_system_operators,
            objectiveFn = jsonObj.objective_fun,
            destination = jsonObj.obj_fun_destination,
            eqSysLeftMatrix = new Matrix(eqSysLeft),
            eqSysRightMatrix = new Matrix(eqSysRight),
            eqSysOperatorsMatrix = new Matrix(eqSysOperators),
            objectiveFnMatrix = new Matrix(objectiveFn);

        return new OptimizationProblem(
            eqSysLeftMatrix,
            eqSysRightMatrix,
            eqSysOperatorsMatrix,
            objectiveFnMatrix,
            destination);
    }
}
