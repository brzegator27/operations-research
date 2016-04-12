'use strict';

import {DualProblemInputFileField} from './lib/component/dualProblemInputFielField/DualProblemInputFileField.js';
import {LocalJsonFileDownloadField} from './lib/component/localJsonFileDowloadField/LocalJsonFileDownloadField.js';
import {OptimizationProblemReader} from './lib/dualProblem/OptimizationProblemReader.js';
import Matrix from './lib/math/Matrix.js';

window.onload = function () {
    let dualProblemDivContainer = document.getElementById('dual-problem-container'),
        dualProblemInput = new DualProblemInputFileField((jsonObj) => {
            console.log(jsonObj);

            let opPrReader = new OptimizationProblemReader(),
                optimizationProblem = opPrReader.getPrimeProblemFromJsonDataObj(jsonObj);

            console.log(optimizationProblem);

            // optimizationProblem.transformToDualProblem();
            let dualProblemFileDownloadField = new LocalJsonFileDownloadField(
                optimizationProblem.getOptimizationProblemDataObj(),
                'Dual problem JSON file',
                'dualProblem.json');
            
            dualProblemFileDownloadField.render(dualProblemDivContainer);
        });

    console.log(dualProblemDivContainer);
    dualProblemInput.render(dualProblemDivContainer);
};

console.log(new Matrix(2, 3, {
    filler: 0
}));