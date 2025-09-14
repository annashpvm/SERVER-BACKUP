<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>example-aggregate-functions-and-grouping-sum-with-group-by- php mysql examples | w3resource</title>
<meta name="description" content="example-aggregate-functions-and-grouping-sum-with-group-by- php mysql examples | w3resource">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
</head>
<body>
<div class="container">
<div class="row">
<div class="col-md-12">
<h2>Category id and sum of total costs of purchases grouped by category id:</h2>
<table class='table table-bordered'>
<tr>
<th>Category id</th><th>Sum of total costs of purchases</th>
</tr>
<?php

$dbh = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');
foreach($dbh->query('select * from mas_company') as $row) {
echo "<tr>"; 
echo "<td>" . $row['company_name'] . "</td>";
echo "<td>" . $row['company_id'] . "</td>";
echo "</tr>"; 
}
?>
</tbody></table>
</div>
</div>
</div>
</body>
</html>



