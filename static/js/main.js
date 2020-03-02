// Create new entry
function aktivaAdd() {
    var type = $("#inputAktivaType").val();
    var value = $("#inputAktivaValue").val();
    var tr = 
    "<tr>" +
        "<th>" + type + "</th>" +
        "<td></td>" +
        "<td>" + value + "</td>" +
        "<td>" +
        "<button type=\"button\" class=\"close\" aria-label=\"Close\" data-toggle=\"modal\" data-target=\"#deleteModal\">" +
        "<span aria-hidden=\"true\">&times;</span>" +
        "</button>" +
        "</td>" +
    "</tr>";
    // Add to liquid or to immobilien
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

// Valid aktiva add form
function isValidAktivaForm() {
    if ($("#inputAktivaType").val() != null && $("#inputAktivaType").val() != '') {
        return true;
    } else {
        return false;
    }
}

// Add only if aktiva type is set and clear form
function aktivaUpdate() {
    if (isValidAktivaForm()) {
        aktivaAdd();
        clearForm();
        $("#inputAktivaType").focus();
    } else {
        alert("Bitte geben Sie einen Typ an");
    }
}

// Clear the form
function clearForm() {
    $("#inputAktivaType").val("");
    $("#inputAktivaValue").val("");
}

$(document).ready(function(){
    // Delete on confirm modal dialog
    $('#deleteModal').on('shown.bs.modal', function (event) {
        $('#btnDeleteConfirm').trigger('focus')
            var button = $(event.relatedTarget)
        $("#btnDeleteConfirm").click(function(e) {
            $(button).closest('#deleteForm').submit(); // search the closest deleteForm and submit

            // might be required later: full js-editing and saving only to backend
            //$(button).parents("tr").remove();
        });       
    });
});
