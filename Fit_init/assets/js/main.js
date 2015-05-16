angular.module('muscleList', []).controller('MuscleController', function($scope) {

    $scope.muscleNames=[
        { mainMuscle: 'ABS', subMuscle: 'Abdominals'},
        { mainMuscle: 'ARMS', subMuscle: 'Biceps'},
        { mainMuscle: 'SHOULDERS', subMuscle: 'Anterior delts'},
        { mainMuscle: 'BACK', subMuscle: 'Erector spinae'},
        { mainMuscle: 'LEGS', subMuscle: 'Calves'},
        { mainMuscle: 'BUTTOCKS', subMuscle: 'Gluteus maximus'},
        { mainMuscle: 'HIPS',subMuscle: 'Hip adductors'},
        { mainMuscle: 'CHEST', subMuscle: 'Pectoralis major'},
        { mainMuscle: 'HEART', subMuscle: 'Heart'}
    ];
    
    this.change = function change(muscleNames) {
        if(muscleNames == 'ABS') window.alert(muscleNames);
        if(muscleNames == 'ARMS') window.alert(muscleNames);
        if(muscleNames == 'SHOULDERS') window.alert(muscleNames);
        if(muscleNames == 'BACK') window.alert(muscleNames);
        if(muscleNames == 'LEGS') window.alert(muscleNames);
        if(muscleNames == 'BUTTOCKS') window.alert(muscleNames);
        if(muscleNames == 'HIPS') window.alert(muscleNames);
        if(muscleNames == 'CHEST') window.alert(muscleNames);
        if(muscleNames == 'HEART') window.alert(muscleNames);
    };
    
});