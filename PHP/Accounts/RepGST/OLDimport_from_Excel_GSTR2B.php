 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$rmon = 0;
$mnt=$_POST['repmonth'];
$yr=$_POST['repyear'];

echo $mnt.$yr;


?>
<html>
    <head>
       	<link rel="stylesheet" type="text/css" href="/DOMAIN/excel/styles1.css" />
						<form method="post">
  <label for="repmonth">Month:</label>
  <input type="text"  min="1"  max ="12" id="repmonth" name="repmonth"> <br><br>
  <label for="repyear">Year:</label>
  <input type="text"  min="2025"  max ="2050" id="repyear" name="repyear" ><br><br>

						</form>

    </head>
</html>
<div class="content-wrapper">
    <section class="content container-fluid">
        <div class="container">
		<div class="row">
			<div class="span3 hidden-phone"></div>
			<div class="span6" id="form-login">





				<form class="form-horizontal well"  action="" method="POST" name="upload_excel" enctype="multipart/form-data">







					<fieldset>
						<center><legend>GSTR - 2B Excel Upload</legend></center>




						<div class="control-group">
							<div class="controls">
								<label>CSV File Only:</label><input type="file" name="file" id="file" class="input-large">
							</div>
						</div>
						<br>
						<div class="control-group">
							<div class="controls">
							<button type="submit" id="submit" name="Import" class="btn btn-primary button-loading" data-loading-text="Loading...">Upload </button></br>
							</div>
						</div>
					

					</fieldset>
				</form>
			</div>
		</div>
		
    </section>
</div>

