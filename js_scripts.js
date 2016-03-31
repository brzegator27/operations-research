var solveProblem = function(button) {
    var fileInput = document.getElementById('json-data-input'),
        file = fileInput.files[0],
        fileReader = new window.FileReader();

    fileReader.onloadend = function() {
        var jsonRawData = fileReader.result,
            jsonObj = JSON.parse(jsonRawData.toString()),
            dpObj = {};

        console.log(jsonObj);
        getDpObjectiveFunction(jsonObj, dpObj);
    };

    fileReader.readAsText(file);

};

var getDpObjectiveFunction = function (ppObj, dpObj) {
    var bVector = ppObj.b;

    // if (!dpObj.right_data) {
    //     dpObj.right_data = {};
    // }

    dpObj.obj_fun = JSON.stringify(bVector);
    dpObj.obj_fun_dest = ppObj.obj_fun_dest === 'min'
            ? 'max'
            : 'min';

    console.log(dpObj);
};

var getDpCMatrix = function (ppObj, dpObj) {

};
