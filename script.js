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
                      <td>${boss.startDate}</td>
                      <td>${boss.endDate}</td>
                      <td>${boss.mannerOfDeath}</td>
                      <td>
                          <button class="btn btn-primary btn-sm edit-btn">Edit</button>
                          <button class="btn btn-danger btn-sm delete-btn">Delete</button>
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
      const startDate = $("#start-date").val();
      const endDate = $("#end-date").val();
      const mannerOfDeath = $("#manner-of-death").val();

      const newBoss = {
          name: name,
          nickName: nickName,
          startDate: startDate,
          endDate: endDate,
          mannerOfDeath: mannerOfDeath
      };

      // Refresh the table after adding a new boss
              
      $.post("https://65fce43b9fc4425c6530d292.mockapi.io/mafiaBosses", newBoss)
          .done(function() {
              getAllBosses(); 
              $("#name").val("");
              $("#nickname").val("");
              $("#start-date").val("");
              $("#end-date").val("");
              $("#manner-of-death").val("");
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
              console.error("Error adding boss:", errorThrown);
          });
  });

  // Event listener for delete button click
  $("#bosses-list").on("click", ".delete-btn", function() {
      const bossId = $(this).closest("tr").attr("id");
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
      const bossId = $(this).closest("tr").attr("id");
      // Handle edit functionality here
  });
});