<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];
$griddettrigger = json_decode($_REQUEST['griddetrigger'], true);
$rowcnttrigger = $_REQUEST['cnttrigger'];
$fst_dbcrtype = $_REQUEST['fst_dbcrtype'];
$dbcrno = $_REQUEST['dbcrno'];
$dbcrnonew = $_REQUEST['dbcrnonew'];
$partyledname = $_REQUEST['partyledname'];
$partyledcode = $_REQUEST['ledcode'];
$dbcrvalue = $_REQUEST['dbcrvalue'];
$refno = $_REQUEST['refno'];
$invdate = $_REQUEST['invdate'];
$ledcode = $_REQUEST['ledcode'];
$billvaltxt = $_REQUEST['billvaltxt'];
$voudate = $_REQUEST['voudate'];
$refdate = $_REQUEST['refdate'];
$narration = strtoupper($_REQUEST['narration']);
$prefix = $_REQUEST['prefix'];
$finid = $_REQUEST['finid'];
$invseqno = $_REQUEST['invseqno'];
$cottonled = $_REQUEST['cottonled'];
$finyear = $_REQUEST['finyear'];
$compcode = $_REQUEST['gincompcode'];
$milid = $_REQUEST['milid'];
$dbcrseqno = $_REQUEST['dbcrseqno'];
$error = "Details Not Found!";
$error1 = "Incomplete Details!";
$tdsflag = $_REQUEST['tdsflag'];
$griddet1 = json_decode($_REQUEST['griddet1'], true);
$rowcnt1 = $_REQUEST['cnt1'];
$voudate1 = $_REQUEST['voudate1'];
$refdate1 = $_REQUEST['refdate1'];
$narration1 = strtoupper($_REQUEST['narration1']);
$paytype = 'DN';
$paydate1 = $_REQUEST['paydate1'];
$party1 = $_REQUEST['party1'];
$creditor1 = $_REQUEST['creditor1'];
$totalval1 = $_REQUEST['totalval1'];
$billmode1 = 'D';
$reason1 = $_REQUEST['reason1'];
$finid1 = $_REQUEST['finid1'];
$finyear1 = $_REQUEST['finyear1'];
$compcode1 = $_REQUEST['compcode1'];
$error2 = "Incomplete Details P";
$tdsper = $_REQUEST['tdsper'];
$tdsvalue = $_REQUEST['tdsvalue'];
$tdsvaluenew = ($tdsvalue * $tdsper) / 100;

if ($prefix == "Y") {
    if ($compcode == "1") {
        $queryinvchk = "select count(*) as cnt from  kgdl.yarn_invoice_header where Yarn_Inv_mill_Invoiceno='$refno' and Yarn_Inv_accref_seqno<>0 and Yarn_Inv_finid='$finid'";
        $resultinvchk = mysql_query($queryinvchk);
        $recinv = mysql_fetch_array($resultinvchk);
        $cntinv = $recinv['cnt'];
    } else if ($compcode == "4") {
        $queryinvchk = "select count(*) as cnt from  hometexkgdl.yarn_invoice_header where Yarn_Inv_mill_Invoiceno='$refno' and Yarn_Inv_accref_seqno<>0 and Yarn_Inv_finid='$finid'";
        $resultinvchk = mysql_query($queryinvchk);
        $recinv = mysql_fetch_array($resultinvchk);
        $cntinv = $recinv['cnt'];
    }
} else if ($prefix == "IY") {
    $queryinvchk = "select count(*) as cnt from  kgdl.yarn_invoice_header where Yarn_Inv_mill_Invoiceno='$refno' and Yarn_Inv_accref_seqno<>0 and Yarn_Inv_finid='$finid'";
    $resultinvchk = mysql_query($queryinvchk);
    $recinv = mysql_fetch_array($resultinvchk);
    $cntinv = $recinv['cnt'];
} else if ($prefix == "S") {
    $queryinvchk = "select count(*) as cnt from  kgdl.stores_purinv_header where purinv_party_invno='$refno' and purinv_accref_seqno<>0 and purinv_finid='$finid'";
    $resultinvchk = mysql_query($queryinvchk);
    $recinv = mysql_fetch_array($resultinvchk);
    $cntinv = $recinv['cnt'];
} else if ($prefix == "W") {
    $queryinvchk = "select count(*) as cnt from  kgdl.stores_womin_header where Womin_billno='$refno' and Womin_accref_seqno<>0 and Womin_finid='$finid' and Womin_company_code='$compcode'";
    $resultinvchk = mysql_query($queryinvchk);
    $recinv = mysql_fetch_array($resultinvchk);
    $cntinv = $recinv['cnt'];
} else if ($prefix == "M") {
    $queryinvchk = "select count(*) as cnt from  kgdl.stores_purinv_header where purinv_party_invno='$refno' and purinv_accref_seqno<>0 and purinv_finid='$finid' and purinv_company_code=6";
    $resultinvchk = mysql_query($queryinvchk);
    $recinv = mysql_fetch_array($resultinvchk);
    $cntinv = $recinv['cnt'];
} else if ($prefix == "CT") {
    $queryinvchk = "select count(*) as cnt from  kgdl.purinv_header where pur_parinvno='$refno' and inv_h_vouno<>0 and g_finyear='$finyear' and	g_parid='$cottonled' and g_milid='$milid'";
    $resultinvchk = mysql_query($queryinvchk);
    $recinv = mysql_fetch_array($resultinvchk);
    $cntinv = $recinv['cnt'];
} else if ($prefix == "A") {
    $queryinvchk = "select count(*) as cnt from  kgdl.htstorespurinvheader where purinv_party_invno='$refno' and purinv_accref_seqno<>0 and purinv_finid='$finid' and purinv_company_code='$compcode'";
    $resultinvchk = mysql_query($queryinvchk);
    $recinv = mysql_fetch_array($resultinvchk);
    $cntinv = $recinv['cnt'];
} else if ($prefix == "F") {
    $queryinvchk = "select count(*) as cnt from  dfd.fab_purinv_header where purinv_party_invno='$refno' and purinv_accref_seqno<>0 and purinv_finid='$finid' and purinv_company_code='$compcode'";
    $resultinvchk = mysql_query($queryinvchk);
    $recinv = mysql_fetch_array($resultinvchk);
    $cntinv = $recinv['cnt'];
} else if ($prefix == "K") {
    $queryinvchk = "select count(*) as cnt from  dfd.fibrepurinvheader where Partyinvno='$refno' and Accrefseqno<>0 and Finid='$finid' and Companycode='4'";
    $resultinvchk = mysql_query($queryinvchk);
    $recinv = mysql_fetch_array($resultinvchk);
    $cntinv = $recinv['cnt'];
} else if ($prefix == "T") {
    $queryinvchk = "select count(*) as cnt from  dfd.hometexpurinvheader where PurinvPartyInvno='$refno' and purinvaccrefseqno<>0 and purinvfinid='$finid' and purinvcompanycode='4'";
    $resultinvchk = mysql_query($queryinvchk);
    $recinv = mysql_fetch_array($resultinvchk);
    $cntinv = $recinv['cnt'];
} else {
    $cntinv = 0;
}

if ($rowcnt > 0 && $partyledcode > 0) {
    mysql_query("BEGIN");
    if ($dbcrno !== "" && $dbcrnonew > 0) {
        if ($fst_dbcrtype == "D" || $fst_dbcrtype == "C") {
            if ($fst_dbcrtype == "D") {
                $accrefvoutype = "DN";
            } else if ($fst_dbcrtype == "C") {
                $accrefvoutype = "CN";
            }
            $query1 = "select ifnull(max(accref_seqno),0)+1 as accref_seqno from acc_ref";
            $result1 = mysql_query($query1);
            $rec1 = mysql_fetch_array($result1);
            $ginaccrefseq = $rec1['accref_seqno'];
            $ginaccrefseqnewdncn = $rec1['accref_seqno'];

            $querya2 = "insert into acc_ref
                        (
                                accref_seqno,
                                accref_vouno,
                                accref_comp_code,
                                accref_finid,
                                accref_voudate,
                                accref_vou_type,
                                accref_paymode,
                                accref_payref_no,
                                accref_payref_date,
                                accref_narration,
                                accref_chq_status,
                                accref_reverse_status
                        )
                        values
                        (
                                '$ginaccrefseq',
                                '$dbcrno',
                                '$compcode',
                                '$finid',
                                '$voudate',
                                '$accrefvoutype',
                                '',
                                '',
                                '1900-01-01',
                                '$narration',
                                0,
                                0
                        )";
            $resulta2 = mysql_query($querya2);

            $querydbcr = "select     
                            dbcr_grossvalue,
                            dbcr_value,
                            dbcr_igstvalue,
                            dbcr_cgstvalue,
                            dbcr_sgstvalue from acc_dbcrnote_header h,acc_dbcrnote_trailer t where h.dbcr_seqno=t.dbcr_seqno and h.dbcr_no='$dbcrnonew' and h.dbcr_comp_code='$compcode' and h.dbcr_finid='$finid'";
            $resultdbcr = mysql_query($querydbcr);
            $recdbcr = mysql_fetch_array($resultdbcr);
            $dbvalgross = $recdbcr['dbcr_grossvalue'];
            $dbvaligst = $recdbcr['dbcr_igstvalue'];
            $dbvalcgst = $recdbcr['dbcr_cgstvalue'];
            $dbvalsgst = $recdbcr['dbcr_sgstvalue'];
            $dbcrvaluenew = $dbcrvalue - $dbvaligst - $dbvalcgst - $dbvalsgst;

            $inscnt = 0;
            for ($i = 0; $i < $rowcnt; $i++) {
                $slno = $i + 1;
                $subledcode1 = $griddet[$i]['ValueDef'];
                if ($fst_dbcrtype == "D") {
                    if ($slno == 1) {
                        $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','1','$partyledcode','$dbcrvalue','0','$dbcrvalue','2','0','0','','');";
                        $resulta4 = mysql_query($querya4);
                    }
                    if ($slno == 1) {
                        $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','2','$subledcode1','0','$dbcrvaluenew','$dbcrvaluenew','2','0','0','','');";
                        $resulta5 = mysql_query($querya5);
                    }
                } else if ($fst_dbcrtype == "C") {
                    if ($slno == 1) {
                        $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','1','$subledcode1','$dbcrvalue','0','$dbcrvalue','2','0','0','','');";
                        $resulta4 = mysql_query($querya4);
                    }
                    if ($slno == 1) {
                        $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','2','$partyledcode','0','$dbcrvalue','$dbcrvalue','2','0','0','','');";
                        $resulta5 = mysql_query($querya5);
                    }
                }
                if ($slno == 1) {
                    $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','1','$refno','$refdate','$dbcrvalue','$dbcrvalue','$partyledcode');";
                    $resulta3 = mysql_query($querya3);
                }
                if ($slno == 1) {
                    $querya6 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','2','$refno','$refdate','$dbcrvalue','$dbcrvalue','$subledcode1');";
                    $resulta6 = mysql_query($querya6);
                }
                if ($resulta4 & $resulta5) {
                    $inscnt = $inscnt + 1;
                }
            }
            if ($compcode == 1) {
                if ($dbvaligst > 0) {
                    $queryai = "call acc_sp_trn_insacc_tran('$ginaccrefseq','3','33200','0','$dbvaligst','$dbvaligst','2','0','0','','');";
                    $resultai = mysql_query($queryai);
                } else if ($dbvalcgst > 0) {
                    $queryac = "call acc_sp_trn_insacc_tran('$ginaccrefseq','3','33201','0','$dbvalcgst','$dbvalcgst','2','0','0','','');";
                    $resultac = mysql_query($queryac);

                    $queryas = "call acc_sp_trn_insacc_tran('$ginaccrefseq','4','33202','0','$dbvalsgst','$dbvalsgst','2','0','0','','');";
                    $resultas = mysql_query($queryas);
                }
            } else if ($compcode == 4) {
                if ($dbvaligst > 0) {
                    $queryai = "call acc_sp_trn_insacc_tran('$ginaccrefseq','3','33203','0','$dbvaligst','$dbvaligst','2','0','0','','');";
                    $resultai = mysql_query($queryai);
                } else if ($dbvalcgst > 0) {
                    $queryac = "call acc_sp_trn_insacc_tran('$ginaccrefseq','3','33204','0','$dbvalcgst','$dbvalcgst','2','0','0','','');";
                    $resultac = mysql_query($queryac);

                    $queryas = "call acc_sp_trn_insacc_tran('$ginaccrefseq','4','33205','0','$dbvalsgst','$dbvalsgst','2','0','0','','');";
                    $resultas = mysql_query($queryas);
                }
            } else if ($compcode == 8) {
                if ($dbvaligst > 0) {
                    $queryai = "call acc_sp_trn_insacc_tran('$ginaccrefseq','3','34975','0','$dbvaligst','$dbvaligst','2','0','0','','');";
                    $resultai = mysql_query($queryai);
                } else if ($dbvalcgst > 0) {
                    $queryac = "call acc_sp_trn_insacc_tran('$ginaccrefseq','3','34977','0','$dbvalcgst','$dbvalcgst','2','0','0','','');";
                    $resultac = mysql_query($queryac);

                    $queryas = "call acc_sp_trn_insacc_tran('$ginaccrefseq','4','34979','0','$dbvalsgst','$dbvalsgst','2','0','0','','');";
                    $resultas = mysql_query($queryas);
                }
            } else if ($compcode == 11) {
                if ($dbvaligst > 0) {
                    $queryai = "call acc_sp_trn_insacc_tran('$ginaccrefseq','3','34194','0','$dbvaligst','$dbvaligst','2','0','0','','');";
                    $resultai = mysql_query($queryai);
                } else if ($dbvalcgst > 0) {
                    $queryac = "call acc_sp_trn_insacc_tran('$ginaccrefseq','3','34192','0','$dbvalcgst','$dbvalcgst','2','0','0','','');";
                    $resultac = mysql_query($queryac);

                    $queryas = "call acc_sp_trn_insacc_tran('$ginaccrefseq','4','34193','0','$dbvalsgst','$dbvalsgst','2','0','0','','');";
                    $resultas = mysql_query($queryas);
                }
            }
        }
    }
    $query1 = "select ifnull(max(accref_seqno),0)+1 as accref_seqno from acc_ref";
    $result1 = mysql_query($query1);
    $rec1 = mysql_fetch_array($result1);
    $ginaccrefseq = $rec1['accref_seqno'];

    if ($prefix == 'S' || $prefix == 'A') {
        $queryvoun = "select concat('PS',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'PS%'";
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    } else if ($prefix == 'Y') {
        if ($compcode == 1) {
            $queryvoun = "select concat('PY',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'PY%'";
        } else if ($compcode == 4) {
            $queryvoun = "select concat('HY',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'HY%'";
        }
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    } else if ($prefix == 'IY') {
        $queryvoun = "select concat('PY',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'PY%'";
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    } else if ($prefix == 'CT') {
        $queryvoun = "select concat('PC',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'PC%'";
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    } else if ($prefix == 'F') {
        $queryvoun = "select concat('PF',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='4' and accref_finid = '$finid' and accref_vouno like 'PF%'";
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    } else if ($prefix == 'B') {
        $queryvoun = "select concat('PB',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'PB%'";
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    } else if ($prefix == 'IM') {
        $queryvoun = "select concat('EC',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'EC%'";
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    } else if ($prefix == 'W') {
        $queryvoun = "select concat('ES',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'ES%'";
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    } else if ($prefix == 'T') {
        $queryvoun = "select concat('PT',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'PT%'";
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    } else if ($prefix == 'C') {
        $queryvoun = "select concat('CY',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'CY%'";
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    } else if ($prefix == 'D') {
        $queryvoun = "select concat('TG',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'TG%'";
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    } else if ($prefix == 'K') {
        $queryvoun = "select concat('PK',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'PK%'";
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    } else if ($prefix == 'M') {
        $queryvoun = "select concat('PM',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
            where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'PM%'";
        $resultvoun = mysql_query($queryvoun);
        $vou = mysql_fetch_array($resultvoun);
        $accref_vouno = $vou['accref_vouno'];
    }

    if ($prefix == "W") {
        $accrefvoutype = "ES";
    } else if ($prefix == "X") {
        $accrefvoutype = "EC";
    } else {
        $accrefvoutype = "PU";
    }

    $querya2 = "insert into acc_ref
                        (
                                accref_seqno,
                                accref_vouno,
                                accref_comp_code,
                                accref_finid,
                                accref_voudate,
                                accref_vou_type,
                                accref_paymode,
                                accref_payref_no,
                                accref_payref_date,
                                accref_narration,
                                accref_chq_status,
                                accref_reverse_status
                        )
                        values
                        (
                                '$ginaccrefseq',
                                '$accref_vouno',
                                '$compcode',
                                '$finid',
                                '$voudate',
                                '$accrefvoutype',
                                '',
                                '',
                                '1900-01-01',
                                '$narration',
                                0,
                                0
                        )";
    $resulta2 = mysql_query($querya2);

    $inscnt = 0;
    for ($i = 0; $i < $rowcnt; $i++) {
        $slno = $i + 1;
        $subledcode = $griddet[$i]['ValueDef'];
        $creditvalue = $griddet[$i]['Value'];
        if ($fst_dbcrtype == "D") {
            $credit = $_REQUEST['acctrantotamt'];
        } else if ($fst_dbcrtype == "C") {
            $credit = $_REQUEST['acctrantotamt'] + $dbcrvalue;
        } else {
            $credit = $_REQUEST['acctrantotamt'];
        }
        if ($fst_dbcrtype == "D" || $fst_dbcrtype == "C") {
            $creditnew = $_REQUEST['dbcrvalue'];
        } else {
            $creditnew = 0;
        }
        if ($slno == 1) {
            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','1','$partyledcode','0','$credit','$credit','2','0','0','','');";
            $resulta4 = mysql_query($querya4);

            $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','2','$subledcode','$creditvalue','0','$creditvalue','2','0','0','','');";
            $resulta5 = mysql_query($querya5);
        }
        if ($slno == 2) {
            $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','3','$subledcode','$creditvalue','0','$creditvalue','2','0','0','','');";
            $resulta5 = mysql_query($querya5);
        }
        if ($slno == 3) {
            $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','4','$subledcode','$creditvalue','0','$creditvalue','2','0','0','','');";
            $resulta5 = mysql_query($querya5);
        }
        if ($slno == 4) {
            $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','5','$subledcode','$creditvalue','0','$creditvalue','2','0','0','','');";
            $resulta5 = mysql_query($querya5);
        }
        if ($slno == 5) {
            $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','6','$subledcode','$creditvalue','0','$creditvalue','2','0','0','','');";
            $resulta5 = mysql_query($querya5);
        }
        if ($slno == 6) {
            $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','7','$subledcode','$creditvalue','0','$creditvalue','2','0','0','','');";
            $resulta5 = mysql_query($querya5);
        }
        if ($slno == 7) {
            $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','8','$subledcode','$creditvalue','0','$creditvalue','2','0','0','','');";
            $resulta5 = mysql_query($querya5);
        }
        if ($slno == 8) {
            $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','9','$subledcode','$creditvalue','0','$creditvalue','2','0','0','','');";
            $resulta5 = mysql_query($querya5);
        }
        if ($slno == 9) {
            $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','10','$subledcode','$creditvalue','0','$creditvalue','2','0','0','','');";
            $resulta5 = mysql_query($querya5);
        }

        if ($resulta4) {
            $inscnt = $inscnt + 1;
        }
    }

    for ($b = 0; $b < $rowcnttrigger; $b++) {
        $slnotrigger = $b + 1;
        $subledcodetrigger = $griddettrigger[$b]['ValueDef'];
        $creditvaluetrigger = $griddettrigger[$b]['Value'];
        $credittrigger = $_REQUEST['acctrantotamt'];
        $partyrawname = $griddettrigger[$b]['AccountName'];

        if ($slnotrigger == 1) {
            $querytrigger = "call accsptrninsacctrantrigger('$ginaccrefseq','1','$partyledcode','0','$credittrigger','$credittrigger','2','0','$compcode','$accref_vouno','$partyledname');";
            $resulttrigger = mysql_query($querytrigger);

            $querytrigger1 = "call accsptrninsacctrantrigger('$ginaccrefseq','2','$subledcodetrigger','$creditvaluetrigger','0','$creditvaluetrigger','2','0','0','$accref_vouno','$partyrawname');";
            $resulttrigger1 = mysql_query($querytrigger1);
        }
        if ($slnotrigger == 2) {
            $querytrigger2 = "call accsptrninsacctrantrigger('$ginaccrefseq','3','$subledcodetrigger','$creditvaluetrigger','0','$creditvaluetrigger','2','0','0','$accref_vouno','$partyrawname');";
            $resulttrigger2 = mysql_query($querytrigger2);
        }
        if ($slnotrigger == 3) {
            $querytrigger3 = "call accsptrninsacctrantrigger('$ginaccrefseq','4','$subledcodetrigger','$creditvaluetrigger','0','$creditvaluetrigger','2','0','0','$accref_vouno','$partyrawname');";
            $resulttrigger3 = mysql_query($querytrigger3);
        }
        if ($slnotrigger == 4) {
            $querytrigger4 = "call accsptrninsacctrantrigger('$ginaccrefseq','5','$subledcodetrigger','$creditvaluetrigger','0','$creditvaluetrigger','2','0','0','$accref_vouno','$partyrawname');";
            $resulttrigger4 = mysql_query($querytrigger4);
        }
        if ($slnotrigger == 5) {
            $querytrigger5 = "call accsptrninsacctrantrigger('$ginaccrefseq','6','$subledcodetrigger','$creditvaluetrigger','0','$creditvaluetrigger','2','0','0','$accref_vouno','$partyrawname');";
            $resulttrigger5 = mysql_query($querytrigger5);
        }
        if ($slnotrigger == 6) {
            $querytrigger6 = "call accsptrninsacctrantrigger('$ginaccrefseq','7','$subledcodetrigger','$creditvaluetrigger','0','$creditvaluetrigger','2','0','0','$accref_vouno','$partyrawname');";
            $resulttrigger6 = mysql_query($querytrigger6);
        }
        if ($slnotrigger == 7) {
            $querytrigger7 = "call accsptrninsacctrantrigger('$ginaccrefseq','8','$subledcodetrigger','$creditvaluetrigger','0','$creditvaluetrigger','2','0','0','$accref_vouno','$partyrawname');";
            $resulttrigger7 = mysql_query($querytrigger7);
        }
        if ($slnotrigger == 8) {
            $querytrigger8 = "call accsptrninsacctrantrigger('$ginaccrefseq','9','$subledcodetrigger','$creditvaluetrigger','0','$creditvaluetrigger','2','0','0','$accref_vouno','$partyrawname');";
            $resulttrigger8 = mysql_query($querytrigger8);
        }
        if ($slnotrigger == 9) {
            $querytrigger9 = "call accsptrninsacctrantrigger('$ginaccrefseq','10','$subledcodetrigger','$creditvaluetrigger','0','$creditvaluetrigger','2','0','0','$accref_vouno','$partyrawname');";
            $resulttrigger9 = mysql_query($querytrigger9);
        }
    }

    $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','1','$refno','$invdate','$credit','$creditnew','$partyledcode');";
    $resulta3 = mysql_query($querya3);

    if ($fst_dbcrtype == "D" && ($prefix == "S" || $prefix == "Z")) {
        $queryrec = "select ifnull(max(recpay_seqno),0)+1 as recpay_seqno from acc_recpay_tran";
        $resultrec = mysql_query($queryrec);
        $recpay = mysql_fetch_array($resultrec);
        $recpayseqno = $recpay['recpay_seqno'];

        $querya4new = "call acc_sp_trn_insrecpay_tran('$recpayseqno',
					'$ginaccrefseq',
					'$refno',
					'$invdate',
					'$ginaccrefseqnewdncn',
					'$dbcrvalue',
					'0');";
        $resulta4new = mysql_query($querya4new);
    }

    if ($fst_dbcrtype == "D" && $dbcrno <> 'DN' && $ginaccrefseqnewdncn > 0) {

        $queryref = "select ifnull(max(refseqno),0) + 1 as refseqno from acc_recpay_ref;";
        $resultref = mysql_query($queryref);
        $recref = mysql_fetch_array($resultref);
        $recrefseq = $recref['refseqno'];

        $queryrefchk = "select accref_vou_type,accref_vouno from acc_ref where accref_seqno='$ginaccrefseq'";
        $resultrefchk = mysql_query($queryrefchk);
        $recrefchk = mysql_fetch_array($resultrefchk);
        $accvoutype = $recrefchk['accref_vou_type'];
        $refvounumber = $recrefchk['accref_vouno'];

        $queryrefchkbal = "select sum(acctrail_adj_value) as adjvalueref from acc_trail where acctrail_accref_seqno='$ginaccrefseq' and acctrail_led_code='$partyledcode'";
        $resultrefchkbal = mysql_query($queryrefchkbal);
        $recrefchkbal = mysql_fetch_array($resultrefchkbal);
        $balamtref = $recrefchkbal['adjvalueref'];

        $querydate = "select datediff(curdate(),'$invdate') as daysin";
        $resultdate = mysql_query($querydate);
        $recdatenew = mysql_fetch_array($resultdate);
        $refdays = $recdatenew['daysin'];

        $queryrefins = "insert into acc_recpay_ref values ('$recrefseq','$ginaccrefseq','$ginaccrefseqnewdncn','$dbcrvalue',curdate(),'$balamtref','$accvoutype','$refvounumber','$dbcrno','$finid','$compcode','$refno','$invdate','$dbcrvalue','$refdays','PURDEBITNOTE')";
        $resultrefins = mysql_query($queryrefins);
    }


    if ($prefix == "Y") {
        if ($compcode == 1) {
            $querya10 = "update kgdl.yarn_invoice_header
		 set 	Yarn_Inv_accref_seqno='$ginaccrefseq'
		where
			Yarn_Inv_seqno='$invseqno' and
			Yarn_Inv_finid ='$finid'";
            $resulta10 = mysql_query($querya10);
        } else if ($compcode == 4) {
            $querya10 = "update hometexkgdl.yarn_invoice_header
		 set 	Yarn_Inv_accref_seqno='$ginaccrefseq'
		where
			Yarn_Inv_seqno='$invseqno' and
			Yarn_Inv_finid ='$finid'";
            $resulta10 = mysql_query($querya10);
        }
    } else if ($prefix == "IY") {
        $querya10 = "update kgdl.yarn_invoice_header
		 set 	Yarn_Inv_accref_seqno='$ginaccrefseq'
		where
			Yarn_Inv_seqno='$invseqno' and
			Yarn_Inv_finid ='$finid'";
        $resulta10 = mysql_query($querya10);
    } else if ($prefix == "S") {
        $querya10 = "update kgdl.stores_purinv_header
		set
			purinv_accref_seqno='$ginaccrefseq',
			purinv_account_flag='Y'
		where purinv_seqno ='$invseqno' and purinv_finid='$finid'
		and purinv_company_code='$compcode'";
        $resulta10 = mysql_query($querya10);
    } else if ($prefix == "W") {
        $querya10 = "update kgdl.stores_womin_header
		set
			Womin_accref_seqno='$ginaccrefseq'
		where Womin_seqno ='$invseqno' and Womin_finid='$finid'
		and Womin_company_code='$compcode'";
        $resulta10 = mysql_query($querya10);
    } else if ($prefix == "M") {
        $querya10 = "update kgdl.stores_purinv_header
		set
			purinv_accref_seqno='$ginaccrefseq',
			purinv_account_flag='Y'
		where purinv_seqno ='$invseqno' and purinv_finid='$finid'
		and purinv_company_code=6";
        $resulta10 = mysql_query($querya10);
    } else if ($prefix == "CT") {
        $querya10 = "update purinv_header
		set
			inv_h_acctag='Y',
			inv_h_vouno ='$ginaccrefseq'
		where
			g_purinvno='$invseqno' and
			g_finyear ='$finyear' and
			g_parid = '$cottonled' and
			g_milid	= '$milid'";
        $resulta10 = mysql_query($querya10);
    } else if ($prefix == "A") {
        $querya10 = "update kgdl.htstorespurinvheader
                      set
                       purinv_accref_seqno='$ginaccrefseq',
                       purinv_account_flag='Y'
                      where purinv_seqno ='$invseqno' and purinv_finid='$finid'
                      and purinv_company_code='$compcode'";
        $resulta10 = mysql_query($querya10);
    } else if ($prefix == "F") {
        $querya10 = "update dfd.fab_purinv_header
		set
			purinv_accref_seqno='$ginaccrefseq',
			purinv_account_flag='Y'
		where purinv_seqno ='$invseqno' and purinv_finid='$finid'
		and purinv_company_code='$compcode'";
        $resulta10 = mysql_query($querya10);
    } else if ($prefix == "K") {
        $querya10 = "update dfd.fibrepurinvheader
		set
			Accrefseqno='$ginaccrefseq',
			Accountflag='Y'
		where Seqno ='$invseqno' and Finid='$finid'
		and Companycode='4'";
        $resulta10 = mysql_query($querya10);
    } else if ($prefix == "T") {
        $querya10 = "update dfd.hometexpurinvheader
		set
			purinvaccrefseqno='$ginaccrefseq',
			purinvaccountflag='Y'
		where purinvseqno ='$invseqno' and purinvfinid='$finid'
		and purinvcompanycode='4'";
        $resulta10 = mysql_query($querya10);
    }

    if ($tdsflag == 1) {
        $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $result1 = mysql_query($query1);
        $rec1 = mysql_fetch_array($result1);
        $ginaccrefseq1 = $rec1['con_value'];

        $query2 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = 'DN' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode1';";
        $result2 = mysql_query($query2);
        $rec2 = mysql_fetch_array($result2);
        $conval = $rec2['dbcr_no'];
        $vouno1 = $paytype . $conval;

        $query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
        $result3 = mysql_query($query3);
        $rec3 = mysql_fetch_array($result3);
        $gindbcrseq = $rec3['con_value'];

        $query4 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = 'DN' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode1';";
        $result4 = mysql_query($query4);
        $rec4 = mysql_fetch_array($result4);
        $dbcrno = $rec4['dbcr_no'];

        $roundoff1 = round($totalval1) - $totalval1;

        $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq1','$vouno1','$compcode1','$finid1','$voudate1',
                'DN','','','','$paydate1','$narration1',0,0);";
        $resultadn2 = mysql_query($querya2);

        $querya3 = "call acc_sp_trn_insacc_tran('$ginaccrefseq1',1,'$party1','$totalval1',0,'$totalval1',1,0,0,'','$paytype');";
        $resulta3 = mysql_query($querya3);

        $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq1',2,'$creditor1',0,'$totalval1','$totalval1',1,0,0,'','$paytype');";
        $resulta4 = mysql_query($querya4);


        $querya6 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$conval','DN','$compcode1','$finid1','$voudate1',
                '$party1','$roundoff1','$reason1','$narration1','AC','$billmode1','N');";
        $resulta6 = mysql_query($querya6);

        $inscnt1 = 0;
        if ($billmode1 == 'D') {
            for ($i = 0; $i < $rowcnt1; $i++) {
                $slno1 = $i + 1;
                $invno1 = $griddet1[$i]['Inv_no'];
                $invdate1 = $griddet1[$i]['Invoice_date'];
                $dbamt1 = $griddet1[$i]['Debit_val'];
                $adjamt1 = 0;

                $querya5 = "call acc_sp_trn_insacc_trail('$ginaccrefseq1','$slno1','$invno1','$invdate1','$dbamt1','$adjamt1','$party1');";
                $resulta5 = mysql_query($querya5);

                $querya7 = "call acc_sp_insdbcrnotetrailernew('$gindbcrseq','$slno1','$invno1','$invdate1','$dbamt1','$compcode1','$dbamt1',0,0,0);";
                $resulta7 = mysql_query($querya7);

                $querya9 = "call acc_sp_trn_updacc_trail_seq_no('$ginaccrefseq','$invno1','$dbamt1','$party1');";
                $resulta9 = mysql_query($querya9);

                $querya1P = "call acc_sp_trn_updacc_trail_seq_new('$ginaccrefseq1','$invno1','$dbamt1','$party1');";
                $resulta1P = mysql_query($querya1P);

                $queryref1 = "select ifnull(max(refseqno),0) + 1 as refseqno from acc_recpay_ref;";
                $resultref1 = mysql_query($queryref1);
                $recref1 = mysql_fetch_array($resultref1);
                $recrefseq1 = $recref1['refseqno'];

                $queryrefchk1 = "select accref_vou_type,accref_vouno from acc_ref where accref_seqno='$ginaccrefseq'";
                $resultrefchk1 = mysql_query($queryrefchk1);
                $recrefchk1 = mysql_fetch_array($resultrefchk1);
                $accvoutype1 = $recrefchk1['accref_vou_type'];
                $refvounumber1 = $recrefchk1['accref_vouno'];

                $queryrefchkbal1 = "select sum(acctrail_adj_value) as adjvalueref from acc_trail where acctrail_accref_seqno='$ginaccrefseq' and acctrail_led_code='$party1'";
                $resultrefchkbal1 = mysql_query($queryrefchkbal1);
                $recrefchkbal1 = mysql_fetch_array($resultrefchkbal1);
                $balamtref1 = $recrefchkbal1['adjvalueref'];

                $querydate1 = "select datediff(curdate(),'$invdate') as daysin";
                $resultdate1 = mysql_query($querydate1);
                $recdatenew1 = mysql_fetch_array($resultdate1);
                $refdays1 = $recdatenew1['daysin'];

                $queryrefins1 = "insert into acc_recpay_ref values ('$recrefseq1','$ginaccrefseq','$ginaccrefseq1','$dbamt1',curdate(),'$balamtref1','$accvoutype1','$refvounumber1','$vouno1','$finid1','$compcode1','$invno1','$invdate1','0','$refdays1','PURATTACHDEBITNOTE')";
                $resultrefins1 = mysql_query($queryrefins1);

                if ($resulta5 && $resultrefins1) {
                    $inscnt1 = $inscnt1 + 1;
                }
            }
        } else {
            $slno1 = 1;
            $querya5 = "call acc_sp_trn_insacc_trail('$ginaccrefseq1','$slno1','$vouno1','$voudate1','$totalval1',0,'$party1');";
            $resulta5 = mysql_query($querya5);

            $querya7 = "call acc_sp_insdbcrnotetrailernew('$gindbcrseq','$slno1','',curdate(),'$totalval1','$compcode1','$totalval1',0,0,0);";
            $resulta7 = mysql_query($querya7);
        }
        $slno1 = $slno1 + 1;

        $querya8 = "call acc_sp_trn_insacc_trail('$ginaccrefseq1','$slno1','$vouno1','$voudate1','$totalval1',0,'$creditor1');";
        $resulta8 = mysql_query($querya8);

        $querytds = "select led_grp_code from acc_ledger_master where led_code='$creditor1'";
        $resulttds = mysql_query($querytds);
        $rectds = mysql_fetch_array($resulttds);
        $tedled = $rectds['led_grp_code'];

        $querytdsmax = "select ifnull(max(id),0) + 1 as id from acc_tds";
        $resulttdsmax = mysql_query($querytdsmax);
        $rectdsmax = mysql_fetch_array($resulttdsmax);
        $tedledmax = $rectdsmax['id'];

        if ($tedled == 65 && $creditor1 > 0) {
            $querytdsins = "insert into acc_tds values('$tedledmax','$ginaccrefseq1','$tdsper','$tdsvalue','$creditor1',curdate(),'$tdsvaluenew','$finid1','$compcode1','$vouno1')";
            $resulttdsins = mysql_query($querytdsins);
        }

        if ($resultadn2 && $resulta3 && $resulta4 && $resulta6 && $resulta7 && $resulta5 && $resulta10) {
            if ($resulta2 && ($inscnt == $rowcnt)) {
                mysql_query("COMMIT");
                echo '({"success":"true","msg":"' . $vouno1 . '"})';
                if ($prefix == "S") {
                    if ($compcode == 1) {
                        $query = "delete from tempstore";
                        $result = mysql_query($query);
                    } else if ($compcode == 4) {
                        $query = "delete from tempstoresbm";
                        $result = mysql_query($query);
                    } else if ($compcode == 11) {
                        $query = "delete from tempstoreagro";
                        $result = mysql_query($query);
                    }
                } else if ($prefix == "M") {
                    $query = "delete from tempifdstore";
                    $result = mysql_query($query);
                } else if ($prefix == "W") {
                    if ($compcode == 4) {
                        $query = "delete from tempworkoder";
                        $result = mysql_query($query);
                    } else if ($compcode == 1) {
                        $query = "delete from tempworkodervm";
                        $result = mysql_query($query);
                    } else if ($compcode == 11) {
                        $query = "delete from tempworkoderagro";
                        $result = mysql_query($query);
                    }
                } else if ($prefix == "CT") {
                    $query = "delete from tempcotton";
                    $result = mysql_query($query);
                } else if ($prefix == "Y") {
                    if ($compcode == 4) {
                        $query = "delete from tempyarnsbm";
                        $result = mysql_query($query);
                    } else if ($compcode == 1) {
                        $query = "delete from tempyarn";
                        $result = mysql_query($query);
                    }
                } else if ($prefix == "A") {
                    $query = "delete from tempmadeups";
                    $result = mysql_query($query);
                } else if ($prefix == "IY") {
                    $query = "delete from tempimportyarn";
                    $result = mysql_query($query);
                } else if ($prefix == "IM") {
                    $query = "delete from tempworkorderifd";
                    $result = mysql_query($query);
                } else if ($prefix == "K") {
                    $query = "delete from tempfibre";
                    $result = mysql_query($query);
                } else if ($prefix == "T") {
                    $query = "delete from tempaccterry";
                    $result = mysql_query($query);
                }
            } else {
                mysql_query("ROLLBACK");
                echo '({"success":"false","msg":"' . $error1 . '"})';
            }
        } else {
            mysql_query("ROLLBACK");
            echo '({"success":"false","msg":"' . $vouno1 . '"})';
        }
    } else {
        if ($resulta2 && ($inscnt == $rowcnt) && $resulta10) {
            mysql_query("COMMIT");
            echo '({"success":"true","msg":"' . $accref_vouno . '"})';
            if ($prefix == "S") {
                if ($compcode == 1) {
                    $query = "delete from tempstore";
                    $result = mysql_query($query);
                } else if ($compcode == 4) {
                    $query = "delete from tempstoresbm";
                    $result = mysql_query($query);
                } else if ($compcode == 11) {
                    $query = "delete from tempstoreagro";
                    $result = mysql_query($query);
                }
            } else if ($prefix == "M") {
                $query = "delete from tempifdstore";
                $result = mysql_query($query);
            } else if ($prefix == "W") {
                if ($compcode == 4) {
                    $query = "delete from tempworkoder";
                    $result = mysql_query($query);
                } else if ($compcode == 1) {
                    $query = "delete from tempworkodervm";
                    $result = mysql_query($query);
                } else if ($compcode == 11) {
                    $query = "delete from tempworkoderagro";
                    $result = mysql_query($query);
                }
            } else if ($prefix == "CT") {
                $query = "delete from tempcotton";
                $result = mysql_query($query);
            } else if ($prefix == "Y") {
                if ($compcode == 4) {
                    $query = "delete from tempyarnsbm";
                    $result = mysql_query($query);
                } else if ($compcode == 1) {
                    $query = "delete from tempyarn";
                    $result = mysql_query($query);
                }
            } else if ($prefix == "A") {
                $query = "delete from tempmadeups";
                $result = mysql_query($query);
            } else if ($prefix == "IY") {
                $query = "delete from tempimportyarn";
                $result = mysql_query($query);
            } else if ($prefix == "IM") {
                $query = "delete from tempworkorderifd";
                $result = mysql_query($query);
            } else if ($prefix == "K") {
                $query = "delete from tempfibre";
                $result = mysql_query($query);
            } else if ($prefix == "T") {
                $query = "delete from tempaccterry";
                $result = mysql_query($query);
            }
        } else {
            mysql_query("ROLLBACK");
            echo '({"success":"false","msg":"' . $error2 . '"})';
        }
    }
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $error . '"})';
}
?>

