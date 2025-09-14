<!DOCTYPE html>
<html lang="en">
<head>
  <title>Send Message</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
  <h2>Send Message</h2>
  <p id="message"></p>
	<div class="form-group">
       <label for="email">Sender ID:</label>
       <input type="email" class="form-control" id="senderid" placeholder="Enter Sender ID" name="senderid">
    </div>
    <div class="form-group">
		<label for="pwd">Mobile No.:</label>
		<input type="text" class="form-control" id="mobile" placeholder="Enter Mobile No" name="mobile">
    </div>
    <div class="form-group">
		<label for="comment">Message:</label>
		<textarea class="form-control" rows="5" id="message" name="Message" placeholder="Write Your Message Here...."></textarea>
	</div>
    <button type="submit" class="btn btn-primary" id="send">Send Message</button>
 
</div>
<script>
	$("#send").click(function(){
		$.ajax({
					type: "POST",
					url: "process.php",
					data:{
						senderid: $('#senderid').val(),
						mobile: $('#mobile').val(),
						message: $('#message').val()
					},
					success: function(data){
							var objJSON = JSON.parse(data);
							$('#message').html(objJSON.message); 
					}
		});
	});
</script>
</body>
</html>


