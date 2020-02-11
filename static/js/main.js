// Create new entry
function aktivaAdd() {
    var type = $("#aktivaType").val();
    var value = $("#aktivaValue").val();
    var tr = "<tr>" +
    "<th>" + type + "</th>" +
    "<td></td>" +
    "<td>" + value + "</td>" +
    "<td>" +
    "<button type=\"button\" class=\"close\" aria-label=\"Close\" data-toggle=\"modal\" data-target=\"#deleteModal\">" +
    "<span aria-hidden=\"true\">&times;</span>" +
    "</button>" +
    "</td>" +
"</tr>";

    if ($("#kat").val() == "liq") {
        $("#liquid tbody").append(
            tr
        );
    } else {
        $("#immo tbody").append(
            tr
        );
    }
    
}

// Add only if aktiva type is set and clear form
function aktivaUpdate() {
    if ($("#aktivaType").val() != null && $("#aktivaType").val() != '') {
        aktivaAdd();
        clearForm();
        $("#aktivaType").focus();
    } else {
        alert("Bitte geben Sie einen Typ an");
    }
}

// Clear the form
function clearForm() {
    $("#aktivaType").val("");
    $("#aktivaValue").val("");
}

// Remove entry
function aktivaDelete(ctl) {
    $(ctl).parents("tr").remove();
}

// Confirm remove entry
function aktivaDelete2() {
    $(".close").click(function () {
        var id = $(this).data("uid");
        console.log(id);
    })
}


$(document).ready(function(){
    // Delete row on confirm modal dialog
    $('#deleteModal').on('shown.bs.modal', function (event) {
        $('#btnDeleteConfirm').trigger('focus')
        var button = $(event.relatedTarget)
        $("#btnDeleteConfirm").click(function() {
            $(button).parents("tr").remove();
        });       
    });
});