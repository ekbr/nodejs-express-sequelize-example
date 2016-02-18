function addFarmer(){     
    window.location.href = '/farmers/add';
}
function cancelAdd(){
    window.location.href = '/farmers';
}

function addTask(){
    window.location.href = '/tasks/add';
}

function getDateLocale(old_date){
    var date = old_date.getDate();
    var month = old_date.getMonth();
    var year = old_date.getFullYear();
    var seconds = old_date.getSeconds();
    var minutes = old_date.getMinutes();
    var hour = old_date.getHours();
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    console.log(hour+':'+minutes+':'+seconds+' '+date+'-'+months[month]+'-'+year);
    var new_date = hour+':'+minutes+':'+seconds+' '+date+'-'+months[month]+'-'+year;
    return new_date;
};