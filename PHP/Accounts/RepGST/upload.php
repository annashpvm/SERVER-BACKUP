
<head>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<style>
thead th { text-align:left; background:grey; color:white}
</style>

</head>

    <div class="content-wrapper" style="background-color: #f3fcfe ">
        <section class="content-header">
              <center>   
	      <i class="fa fa-file-text-o" style="font-size:28px;color:GREEN"></i> <h5>upload</h5>
	      </center>

         <body>    

	<!-- Navbar
    ================================================== -->


	<div id="wrap">
	<div class="container">
		<div class="row">
			<div class="span3 hidden-phone"></div>
			<div class="span6" id="form-login">
				<form class="form-horizontal well" action="import_from_Excel_GSTR2B.php" method="post" name="upload_excel" id="upload_excel" enctype="multipart/form-data">
					<fieldset>
  <label for="repmonth">Month:</label>
  <input type="number"  min="1"  max ="12" id="repmonth" name="repmonth"> <br><br>
  <label for="repyear">Year:</label>
  <input type="number"  min="2025"  max ="2050" id="repyear" name="repyear" ><br><br>
						<legend>Import CSV</legend>
						<div class="control-group">
							
							<div class="controls">
								<input type="file" name="file" id="file" class="input-large">
							</div>
						</div>
						<br>
						<div class="control-group">
							<div class="controls">
							<button type="submit" id="Import" name="Import" class="btn btn-primary button-loading" data-loading-text="Loading...">Upload</button>
							</div>
						</div>
					</fieldset>
				</form>
			</div>
			<div class="span3 hidden-phone"></div>
		</div>
		
<div class="row">

<div>
	</div>

	</div>

	</body>
</section>
</div> 

<script type="text/javascript">
    $(function () {
        $("#Import").click(function () {
 	    var form_data = $("#upload_excel").serialize();

            $.ajax({
                type: "POST",
                url: "import_from_Excel_GSTR2B.php",
       		data:form_data,	
                success: function (data) {
                    var response2 = data.split(",");
                    var invgentrue = response2[0];
                    if (invgentrue === 1) {
                       alert('success');
                    } else {
                       alert('failed');
                    }
                }
            });
        });
    });
</script>

