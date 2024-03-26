$(document).ready(function() {
    // Function to fetch and display all bosses from the API
    function getAllBosses() {
        $.get("https://65fce43b9fc4425c6530d292.mockapi.io/mafiaBosses", function(bosses) {
            $("#bosses-list").empty();
            bosses.forEach(function(boss) {
                $("#bosses-list").append(
                    `<tr id="${boss.id}">
                        <td>${boss.name}</td>
                        <td>${boss.nickName}</td>
                        <td>${boss.cartel}</td>
                        <td>${boss.reignedFrom}</td>
                        <td>${boss.mannerOfDeath}</td>
                        <td>
                            <button class="btn btn-primary btn-sm edit-btn" data-boss-id="${boss.id}">Edit</button>
                            <button class="btn btn-danger btn-sm delete-btn" data-boss-id="${boss.id}">Delete</button>
                        </td>
                    </tr>`
                );
            });
        });
    }
  
    // Call getAllBosses function to initially display all bosses
    getAllBosses();
  
    // Event listener for the form submission to add a new boss
    $("#add-boss-form").submit(function(event) {
        event.preventDefault();
        const name = $("#name").val();
        const nickName = $("#nickname").val();
        const cartel = $("#cartel").val();
        const reignedFrom = $("#reigned-from").val();
        const mannerOfDeath = $("#manner-of-death").val();
  
        const newBoss = {
            name: name,
            nickName: nickName,
            cartel: cartel,
            reignedFrom: reignedFrom,
            mannerOfDeath: mannerOfDeath
        };
  
        // Refresh the table after adding a new boss
                
        $.post("https://65fce43b9fc4425c6530d292.mockapi.io/mafiaBosses", newBoss)
            .done(function() {
                getAllBosses(); 
                $("#name").val("");
                $("#nickname").val("");
                $("#cartel").val("");
                $("#reigned-from").val("");
                $("#manner-of-death").val("");
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.error("Error adding boss:", errorThrown);
            });
    });
  
    // Event listener for delete button click
    $("#bosses-list").on("click", ".delete-btn", function() {
        const bossId = $(this).data("boss-id");
        $.ajax({
            url: `https://65fce43b9fc4425c6530d292.mockapi.io/mafiaBosses/${bossId}`,
            type: "DELETE",
            success: function() {
                $(`#${bossId}`).remove(); // Remove the boss row from the table
            }
        });
    });
  
    // Event listener for edit button click
    $("#bosses-list").on("click", ".edit-btn", function() {
        const bossId = $(this).data("boss-id");
        
        // Fetch boss details
        $.get(`https://65fce43b9fc4425c6530d292.mockapi.io/mafiaBosses/${bossId}`, function(boss) {
            // Populate form fields with boss details
            $("#name").val(boss.name);
            $("#nickname").val(boss.nickName);
            $("#cartel").val(boss.cartel);
            $("#reigned-from").val(boss.reignedFrom);
            $("#manner-of-death").val(boss.mannerOfDeath);

            // Scroll to the top of the form
            $('html, body').animate({
                scrollTop: $("#add-boss-form").offset().top
            }, 500);
        });
    });
});