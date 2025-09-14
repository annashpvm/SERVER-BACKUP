
<!DOCTYPE html>
<?php
header('Content-type: text/html; charset=utf-8');
?>

<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Bank Reconciliation</title>
        <script type="text/javascript" src="/Bank_Reconciliation/Dynamic_menu/jquery.js"></script>
        <link rel="stylesheet" type="text/css" href="/Bank_Reconciliation/Dynamic_menu/D_menu.css" media="all" />
    </head>

    <body background="/Bank_Reconciliation/Pictures/bank1.jpg">
        <div id="head" style=" background-image: url(/Bank_Reconciliation/Pictures/bank1.jpg); height: 40px;  border: 1px solid black;">
            <label><center>
                    <h2>BANK RECONCILIATION</h2></center>
            </label>
        </div>
        <div style="height:10px;"  >
            <ul id="nav">
                <li><a href="#">Home</a></li>
                <?php
                require($_SERVER["DOCUMENT_ROOT"] . "/Bank_Reconciliation/Conn.php");
                ?>
                <?php
                $loginvalue = $_GET["d57g04a9hko"];
                $user = $_GET["nfg"];
                $cyear = date("Y");
                $cmonth = date("m");
                $cdate = date("d");
                $role = $loginvalue / ($cyear * $cdate / $cmonth);

                $role = intval($role);

                if ($role === 5) {
                    $res = mysql_query("SELECT * FROM main_menu where admin_rights='Y' ");
                }
                if ($role === 4) {
                    $res = mysql_query("SELECT * FROM main_menu where users_rights='Y' ");
                }
                

                while ($row = mysql_fetch_array($res)) {
                    ?>
                    <li>
                        <a href="#"> <?php echo $row['m_menu_name']; ?></a>
    <?php
    if ($role === 5) {
        $res_pro = mysql_query("SELECT * FROM sub_menu WHERE admin_rights='Y' and m_menu_id=" . $row['m_menu_id']);
    }
    if ($role === 4) {
        $res_pro = mysql_query("SELECT * FROM sub_menu WHERE users_rights='Y' and m_menu_id=" . $row['m_menu_id']);
    }
    
    ?>

                        </font>
                        <ul><font size="1" face="Arial">				
    <?php
    while ($pro_row = mysql_fetch_array($res_pro)) {
        ?><li><a target='_blank' href="<?php echo $pro_row['s_menu_link'] . '/?user=' . $user; ?>"><?php echo $pro_row['s_menu_name']; ?></a></li><?php
                            }
                            ?>
                            </font>
                        </ul>
                    </li>
    <?php
}
?>

                <li><a href="/Bank_Reconciliation/index.php">Logout</a></li>
        </div>

        <script type="text/javascript">
            $(document).ready(function ()
            {
                $('#nav li').hover(function ()
                {
                    $('ul', this).slideDown('fast');
                }, function ()
                {
                    $('ul', this).slideUp('fast');
                });
            });
        </script>
    </body>
</html>