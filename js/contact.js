function deleteContact(id) {       
    $.ajax({
        type: "DELETE",
        url: '/sql-contact/' + id,                
        success: function (data) {
            console.log("deleted" + id)
            var idName='#'+id;
            $(idName).remove();
        },
        error: function (data) {
            console.log('Error:', data);
        }
    })    
}