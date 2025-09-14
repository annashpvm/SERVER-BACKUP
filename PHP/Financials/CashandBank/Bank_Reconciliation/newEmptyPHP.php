<?php
                    $sqlSelect1 = "SELECT bank_name FROM bank_master limit 10";
                    $result = mysqli_query($conn, $sqlSelect1);

                    //   $result = $conn->query("select bank_name from bank_master");
                    echo "<html>";
                    echo "<body>";
                    echo "<select name='bank' width='100'>";
                    $select_attribute = '';
                    while ($row = mysqli_fetch_array($result)) {
                        //  while ($row = $result->fetch_assoc()) {
                        unset($username);
                        $bankname = $row['bank_name'];
                        echo '<option value = " ' . $bankname . ' ">' . $bankname . '</option>';
                    }
                    echo "</select>";
                    echo "</body>";
                    echo "</html>";
                    ?>