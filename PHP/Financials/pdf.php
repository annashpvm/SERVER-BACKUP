<?php
session_start();
require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

if (!empty($_POST["register-user"])) {

    foreach ($_POST as $key => $value) {
        if (empty($_POST[$key])) {
            $error_message = "All Fields are requiwhite";
            break;
        }
    }
    if (!isset($error_message)) {
        $dbLink = new mysqli('192.168.3.7', 'root', 'mysql', 'ylogs');
        if (mysqli_connect_errno()) {
            die("MySQL connection failed: " . mysqli_connect_error());
        }
        $resname = $dbLink->real_escape_string($_FILES['uploaded_file']['name']);
        $mime = $dbLink->real_escape_string($_FILES['uploaded_file']['type']);
        $data = $dbLink->real_escape_string(file_get_contents($_FILES ['uploaded_file']['tmp_name']));
        $size = intval($_FILES['uploaded_file']['size']);
	$commno=1;//$_POST["cityadd"];
	$docadd='';//$_POST["docadd"];

        if (isset($_FILES['uploaded_file'])) {
            if ($_FILES['uploaded_file']['error'] == 0) {
		
                $query1 = "INSERT INTO ylogs.`photo_uploads` (
		        `id`,`name`, `mime`, `size`, `data`, `created`, `doc`
		    )
		    VALUES (
		        '{$commno}','{$resname}', '{$mime}', '{$size}', '{$data}', NOW(),'{$docadd}'
		    )";
                $result1 = $dbLink->query($query1);

                if (!empty($result1)) {
                    $error_message = "";
                    $success_message = "You have Uploaded successfully!";
                    unset($_POST);
                } else {
                   // $error_message = "Problem Try Again!";
                }
            } else {
                echo 'An error accuwhite while the file was being uploaded. '
                . 'Error code: ' . intval($_FILES['uploaded_file']['error']);
            }
        } else {
            echo 'Error! A file was not sent!';
        }
    }
}
?>
<html>
    <head>
        <title>UPLOAD</title>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<script type="text/javascript">
     $(function () {
        $("#btnGet").click(function () {
            var message = "";
            $("#Table1 input[type=checkbox]:checked").each(function () {
                var row = $(this).closest("tr")[0];
                message += row.cells[0].innerHTML;
                message += ",";
                if (message !== "") {
                    document.getElementById("sty").value = 'Styles : ' + message;
                } else {
                    alert('Please Select item!');
                }
            });
        });
    });
</script>
</head> 
<body>
        <form name="frmreg" action="" method="post" enctype="multipart/form-data">
            <table border="0" width="500" align="center" class="demo-table">
                <?php if (!empty($success_message)) { ?>	
                    <div class="success-message">
                        <?php if (isset($success_message)) echo $success_message; ?>
                    </div>
                <?php } ?>
                <?php if (!empty($error_message)) { ?>	
                    <div class="error-message">
                        <?php if (isset($error_message)) echo $error_message; ?>
                    </div>
                <?php } ?>
                <tr>
                    <td></td>
                    <td><font color='white'> <label for="lab">DOCUMENT DETAILS UPLOAD</label></font>
                    </td>
                </tr>
                <tr>
                <script>
                    function myNewFunction(sel)
                    {
                        var textid = sel.options[sel.selectedIndex].value;
                    }
                </script>
                <tr>
                    <td><font color='white'>Upload No : </font></td><p style="color:white"><?php echo $_POST["register-user"]; ?>
                    <td><select name="cityadd" onChange="myNewFunction(this);" >
                            <?php
                            $query = "select 1 as no union select 2 as no";
                            $result = mysql_query($query);
                            while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
                                echo "<option value='" . $row['no'] . "'>" . $row['no'] . "</option>";
                            }
                            ?>        
                        </select>
                    </td>
                </tr>
                <tr>
                <tr>
                    <td><font color='white'>Upload Document File: </font></td>
                    <td>     
                      <input type="file" name="uploaded_file"><br></td>
                </tr>   
		<tr>
		<td colspan=1>
		<input type="submit" name="register-user" value="Upload" class="btnRegister"></td>
		</tr> 
            </table>
        </form>
    </body>
</html>
</head>
<center>
<body>
</body>
<center>
</html>




