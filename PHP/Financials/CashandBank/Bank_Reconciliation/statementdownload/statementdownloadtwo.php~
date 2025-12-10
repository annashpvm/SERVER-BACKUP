<?php
$conn = mysqli_connect("192.168.3.7", "root", "mysql", "kgdl");

if (isset($_POST["import"])) {

    $bcode = $_POST['bankk'];
    $idate = $_POST['idate'];
    // $smonth = $_POST['month'];
    //$syear = $_POST['yearr'];


    $fileName = $_FILES["file"]["tmp_name"];


    if ($_FILES["file"]["size"] > 0) {

        $sqlSelectt = "SELECT bank_code,value_date FROM bank_statement where bank_code=$bcode and value_date='$idate' ";
        $resultt = mysqli_query($conn, $sqlSelectt);

        while ($row = mysqli_fetch_array($resultt)) {

            $val1 = $row['bank_code'];
        }

        if ($val1 > 0) {
            echo "<script type='text/javascript'> alert('Data already exists');</script>";
        } else {

            $file = fopen($fileName, "r");
            while (($column = fgetcsv($file, 10000, ",")) !== FALSE) {
                $sqlInsert = "INSERT into  bank_statement(
      bank_code,
      value_date,
      particulars,
      cheque_no,
      debit_amount,
      credit_amount,
      active_status,
      created_by,
      created_date,
      recon_status
      )
      values ('$bcode','" . $column[0] . "', '" . $column[1] . "', '" . $column[2] . "', '" . $column[3] . "', '" . $column[4] . "','Y',7055,now(),'check')";
                $result = mysqli_query($conn, $sqlInsert);

                if (!empty($result)) {
                    $type = "success";
                    $message = "CSV Data Imported into the Database";
                    header("Cache-Control: no-cache");
                } else {
                    $type = "error";
                    $message = "Problem in Importing CSV Data";
                }
            }
        }
    }
}
?>
<!DOCTYPE html>
<html>

    <head>
        <script src="jquery-3.2.1.min.js"></script>

        <style>
            body {
                font-family: Arial;
                width: 550px;
            }

            .outer-scontainer {
                background: #F0F0F0;
                border: #e0dfdf 1px solid;
                padding: 20px;
                border-radius: 2px;
            }

            .input-row {
                margin-top: 0px;
                margin-bottom: 20px;
            }

            .btn-submit {
                background: #333;
                border: #1d1d1d 1px solid;
                color: #f0f0f0;
                font-size: 0.9em;
                width: 100px;
                border-radius: 2px;
                cursor: pointer;
            }

            .outer-scontainer table {
                border-collapse: collapse;
                width: 100%;
            }

            .outer-scontainer th {
                border: 1px solid #dddddd;
                padding: 8px;
                text-align: left;
            }

            .outer-scontainer td {
                border: 1px solid #dddddd;
                padding: 8px;
                text-align: left;
            }

            #response {
                padding: 10px;
                margin-bottom: 10px;
                border-radius: 2px;
                display:none;
            }

            .success {
                background: #c7efd9;
                border: #bbe2cd 1px solid;
            }

            .error {
                background: #fbcfcf;
                border: #f3c6c7 1px solid;
            }

            div#response.display-block {
                display: block;
            }
        </style>
        <script type="text/javascript">
            $(document).ready(function () {
                $("#frmCSVImport").on("submit", function () {

                    $("#response").attr("class", "");
                    $("#response").html("");
                    var fileType = ".csv";
                    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + fileType + ")$");
                    if (!regex.test($("#file").val().toLowerCase())) {
                        $("#response").addClass("error");
                        $("#response").addClass("display-block");
                        $("#response").html("Invalid File. Upload : <b>" + fileType + "</b> Files.");
                        return false;
                    }
                    return true;
                });
            });
        </script>
    </head>

    <body bgcolor="olive">
        <br>
        <br>
        <br>
    <center><h2>Bank Statement Import</h2></center>

    <div id="response" class="<?php
    if (!empty($type)) {
        echo $type . " display-block";
    }
    ?>"><?php
             if (!empty($message)) {
                 echo $message;
             }
             ?></div>

    <div class="outer-scontainer">
        <?php
        // array_pop($results);
        ?>
        <form class="form-horizontal" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post"
              name="frmCSVImport" id="frmCSVImport" enctype="multipart/form-data">
            <div class="row">
                <table border="0">
                    <tr>  <td width="1%"> Bank</td><td ><select name="bankk" id="bankk" required>
                                <?php
                                $sqlSelect1 = "SELECT bank_code,bank_name FROM bank_master";
                                $result = mysqli_query($conn, $sqlSelect1);
// $query = mysql_query($sql);
// while ($results[] = mysql_fetch_object($query));
                                while ($row = mysqli_fetch_array($result)) {
                                    // foreach ($row as $option) 
                                    $bankcode = $row['bank_code'];
                                    $bankname = $row['bank_name']
                                    ?>
                                    <option value="<?php echo $bankcode; ?>"><?php echo $bankname; ?></option>
                                    <?php
                                    //endforeach;
                                }
                                ?>
                            </select></td>
                    </tr>
                    <tr>
                        <td width="1%"> Date</td><td> <input type="date" name="idate" required></td>
                    </tr>
                </table>
                <br>

                <div class="input-row">
                    <label class="col-md-4 control-label">Choose CSV
                        File</label> <input type="file" name="file"
                                        id="file" accept=".csv" >
                    <button type="submit" id="submit" name="import"
                            class="btn-submit">Import</button>
                    <br />
                </div>
        </form>
    </div>
    <?php
    $sqlSelect2 = "SELECT * FROM bank_statement order by seqno desc limit 5";
    $result2 = mysqli_query($conn, $sqlSelect2);

    if (mysqli_num_rows($result2) > 0) {
        ?>
        <table id='userTable'>
            <thead>
                <tr>
                    <th>V.date</th>
                    <th>Particulars</th>
                </tr>
            </thead>
            <?php
            while ($row = mysqli_fetch_array($result2)) {
                ?>
                <tbody>
                    <tr>
                        <td><?php echo $row['value_date']; ?></td>
                        <td><?php echo $row['particulars']; ?></td>
                    </tr>
                    <?php
                }
                ?>
            </tbody>
        </table>
    <?php } ?>
</div>

</body>

</html>
