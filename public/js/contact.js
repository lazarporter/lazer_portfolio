function deleteContact(id) {
    $.ajax({
        type: "DELETE",
        url: '/sql-contact/' + id,
        success: function (data) {
            var idName = '#' + id;
            console.log("Hello from AJAX!")
            $(idName).fadeOut('slow', function () {
                $(idName).remove();
            });
        },
        error: function (data) {
            console.log('Error:', data);
        }
    })
}