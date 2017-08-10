// Close the mobile menu on item click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Form validation and handle submit
$(function() {
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            // Inform user the email is being sent
            $('#success').html("<div class='alert alert-info'>");
            $('#success > .alert-info')
                .append("<strong>Processing your RSVP...</strong>");
            $('#success > .alert-info')
                .append('</div>');

            // Collect all the field values
            var name = $("input#name").val();
            var email = $("input#email").val();
            var canAttend = document.getElementById('attendradio1').checked;
            var count = $("select#rsvpcount").val();
            var attendees = $("input#attendees").val();
            var dietary = $("textarea#dietary").val();
            var comments = $("textarea#message").val();

            // Build the email body
            var body = "You have received a new Wedding RSVP from your website!\n\n";
            body += "Here are the details:\n";
            body += "Name: " + name + "\n";
            body += "Email: " + email + "\n";
            body += "Is attending?: " + canAttend + "\n";
            body += "Count of attendees: " + count + "\n";
            body += "List of attendees: " + attendees + "\n";
            body += "Dietary restrictions: " + dietary + "\n";
            body += "Comments: " + comments + "\n";

            // Build the email subject
            var subject = "Wedding RSVP: " + name;

            // Call the PHP script with the data
            $.ajax({
                url: "./php/send_mail.php",
                type: "POST",
                data: {
                    email: email,
                    body: body,
                    subject: subject
                },
                cache: false,
                success: function() {
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html('');
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your RSVP has been sent!</strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                    $('#rsvpForm').trigger("reset");
                },
                error: function() {
                    $('#success').html('');
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + name + ", it seems that there was an error processing your request. Please contact us via email to complete your RSVP.");
                    $('#success > .alert-danger').append('</div>');
                    $('#rsvpForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on name field hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
