function aktivaAdd() {
    var type = $("#aktivaType").val();
    var value = $("#aktivaValue").val();
    var tr = "<tr>" +
    "<th>" + type + "</th>" +
    "<td></td>" +
    "<td>" + value + "</td>" +
    "<td>" +
    "<button type=\"button\" class=\"close\" aria-label=\"Close\" onclick=\"aktivaDelete(this)\">" +
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

function aktivaUpdate() {
    if ($("#aktivaType").val() != null && $("#aktivaType").val() != '') {
        aktivaAdd();
        clearForm();
        $("#aktivaType").focus();
    } else {
        alert("Bitte geben Sie einen Typ an");
    }
}

function clearForm() {
    $("#aktivaType").val("");
    $("#aktivaValue").val("");
}

function aktivaDelete(ctl) {
    $(ctl).parents("tr").remove();
  }