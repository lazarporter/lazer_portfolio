function deleteContact(id) {
    $.ajax({
        type: "DELETE",
        url: '/sql-contact/' + id,
        success: function (data) {
            var idName = '#' + id;
            $(idName).fadeOut('slow', function () {
                $(idName).remove();
            });
        },
        error: function (data) {
            console.log('Error:', data);
        }
    })
}