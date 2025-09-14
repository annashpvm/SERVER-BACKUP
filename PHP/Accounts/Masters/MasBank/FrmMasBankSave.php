<?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $BankName=strtoupper($_POST['BankName']);
 $ShortName=strtoupper($_POST['ShortName']);
 $Address1=strtoupper($_POST['Address1']);
 $Address2=strtoupper($_POST['Address2']);
 $Address3=strtoupper($_POST['Address3']);
 $City=strtoupper($_POST['City']);
 $State=strtoupper($_POST['State']);
 $Country=$_POST['Country'];
 $Phone=$_POST['Phone'];
 $Email=$_POST['Email'];
 $Website=$_POST['Website'];
 $ContactPerson=$_POST['ContactPerson'];
 $Designation=$_POST['Designation'];
 //echo"$CompanyName";
 $query = "select ifnull(max(bank_seqno),0)+1 as con_value from acc_bank_master";

 $result = mysql_query($query);
	
        $rec = mysql_fetch_array($result);
	$ginbankseq=$rec['con_value'];


  $query1="insert into acc_bank_master(bank_seqno,bank_name,bank_shortname,bank_add1,bank_add2,bank_add3,bank_city,bank_state,
           bank_country_code,bank_phone,bank_email,bank_website,bank_contact_person,bank_contact_persondesg)
           VALUES
            (
            '$ginbankseq',
            '$BankName',
	    '$ShortName',
            '$Address1',
            '$Address2',
            '$Address3',
            '$City',
            '$State',
            '$Country',
            '$Phone',
            '$Email',
            '$Website',
            '$ContactPerson',
            '$Designation'
            )";
  $result1 = mysql_query($query1);

  
      if ((!$result1))
      {
           Echo '{success:false,results:1,
             rows:[{"Bank":"$BankName"}]}';
      }
     else
      {
           Echo '{success:true,results:1,
             rows:[{"Bank":"$BankName"}]}';
             }
?>
