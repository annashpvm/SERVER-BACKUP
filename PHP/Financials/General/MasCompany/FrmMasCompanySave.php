<?
 session_start();
?>

<?php
 mysql_connect("192.168.3.130","root","mysql") or die("Connect : Failure" . mysql_error());
 mysql_select_db("kgdl");
 $CompanyName=strtoupper($_POST['CompanyName']);
 $Address1=strtoupper($_POST['Address1']);
 $Address2=strtoupper($_POST['Address2']);
 $Address3=strtoupper($_POST['Address3']);
 $City=strtoupper($_POST['City']);
 $Pincode=$_POST['Pincode'];
 $State=strtoupper($_POST['State']);
 $Country=$_POST['Country'];
 $Phone=$_POST['Phone'];
 $Fax=$_POST['Fax'];
 $Email=$_POST['Email'];
 $Website=$_POST['Website'];
 //echo"$CompanyName";
 $query = "select con_value from control_master where con_module='AC' and con_finyear='GENERAL'and con_prefix='COM'and con_desc='COMPANY MASTER'";

 $result = mysql_query($query);
	
        $rec = mysql_fetch_array($result);
	$fin_companycode=$rec['con_value'];


  $query1="insert into acc_company_master(comp_code,comp_name,comp_addr1,comp_addr2,comp_addr3,comp_city,comp_state,
           comp_pincode,comp_country_code,comp_phone,comp_fax,comp_email,comp_website,comp_password)
           VALUES
            (
            '$fin_companycode',
            '$CompanyName',
            '$Address1',
            '$Address2',
            '$Address3',
            '$City',
            '$State',
            '$Pincode',
            '$Country',
            '$Phone',
            '$Fax',
            '$Email',
            '$Website',
            ''
            )";
  $result1 = mysql_query($query1);

  $query2 = "update control_master
           set con_value=con_value+1
           where con_module='AC' and con_finyear='GENERAL'and con_prefix='COM'and con_desc='COMPANY MASTER'";

    $result2 = mysql_query($query2);

      if ((!$result1))
      {
           Echo '{success:false,results:1,
             rows:[{"Company":"$CompanyName"}]}';

      }

     else
             {
              Echo '{success:true,results:1,
             rows:[{"Company":"$CompanyName"}]}';
             }
?>
