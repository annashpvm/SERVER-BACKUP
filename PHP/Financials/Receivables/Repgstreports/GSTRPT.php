<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$compcode = $_POST['compcode'];
$finid = $_POST['finid'];
$fromdate = $_POST['fromdate'];
$todate = $_POST['todate'];
$RPT = $_POST['RPT'];
 mysql_query("BEGIN");
 
 if ($RPT == "GST") {

	/*if ($compcode == "%") {
		$compcode = "%";
	}*/

 
 $vewdropquery1 = mysql_query("DROP VIEW IF EXISTS vew_purchase_str_rm_fu");
 
 $crtvew1 = mysql_query("CREATE 
VIEW vew_purchase_str_rm_fu AS
    SELECT 
        'ST' AS type,
        aa1.sup_gstin AS sup_gstin,
        aa1.sup_refname AS sup_refname,
        aa1.hsn_code AS hsn_code,
        aa1.billno AS billno,
        aa1.billdate AS billdate,
        aa1.grnno AS grnno,
        aa1.grndate AS grndate,
        aa1.state_codeno AS state_codeno,
        aa1.state_name AS state_name,
        SUM(aa1.invamt) AS invamt,
        SUM(aa1.value) AS value,
        SUM(aa1.mint_cgst_amt) AS cgst_amt,
        SUM(aa1.mint_sgst_amt) AS sgst_amt,
        SUM(aa1.mint_igst_amt) AS igst_amt,
        aa1.mint_cgst_per AS cgst_per,
        aa1.mint_sgst_per AS sgst_per,
        aa1.mint_igst_per AS igst_per,
        0 AS cess_amount,
        aa1.uom_short_name AS uom,
        SUM(aa1.recdqty) AS recdqty,
        MAX(aa1.Item_name) AS itemname
    FROM
        (SELECT 
            c.sup_gstin AS sup_gstin,
                c.sup_refname AS sup_refname,
                f.hsn_code AS hsn_code,
                a.minh_bill_no AS billno,
                a.minh_bill_date AS billdate,
                a.minh_minno AS grnno,
                a.minh_mindate AS grndate,
                d.state_codeno AS state_codeno,
                d.state_name AS state_name,
                (((((b.mint_value + b.mint_igst_amt) + b.mint_sgst_amt) + b.mint_cgst_amt) + b.mint_qcdev_val) - b.mint_others) AS invamt,
                b.mint_value AS value,
                b.mint_cgst_amt AS mint_cgst_amt,
                b.mint_sgst_amt AS mint_sgst_amt,
                b.mint_igst_amt AS mint_igst_amt,
                b.mint_cgst_per AS mint_cgst_per,
                b.mint_sgst_per AS mint_sgst_per,
                b.mint_igst_per AS mint_igst_per,
                b.mint_rcvd_qty AS recdqty,
                g.uom_short_name AS uom_short_name,
                e.item_name AS Item_name
        FROM
            ((((((trnpur_min_header a
        JOIN trnpur_min_trailer b)
        JOIN maspur_supplier_master c)
        JOIN mas_state d)
        JOIN maspur_item_header e)
        JOIN mas_hsncode f)
        JOIN mas_uom g)
        WHERE
            ((a.minh_comp_code = b.mint_comp_code)
                AND (a.minh_fin_code = b.mint_fin_code)
                AND (a.minh_minno = b.mint_minno)
                AND (a.minh_sup_code = c.sup_code)
                AND (b.mint_item_code = e.item_code)
                AND (e.item_hsncode = f.hsn_sno)
                AND (e.item_uom = g.uom_code)
                AND (c.sup_state = d.state_code)
                AND (a.minh_comp_code IN ('$compcode'))
                AND (a.minh_fin_code = '$finid')
                AND (a.minh_mindate >= '$fromdate')
                AND (a.minh_mindate <= '$todate'))) aa1
    GROUP BY aa1.sup_gstin , aa1.sup_refname , aa1.hsn_code , aa1.billno , aa1.billdate , aa1.grnno , aa1.grndate , aa1.state_codeno , aa1.state_name , aa1.mint_cgst_per , aa1.mint_sgst_per , aa1.mint_igst_per , aa1.uom_short_name 
    UNION ALL SELECT 
        'RM' AS type,
        c.sup_gstin AS sup_gstin,
        c.sup_refname AS sup_refname,
        a1.hsn_code AS hsn_code,
        a1.billno AS billno,
        a1.billdate AS billdate,
        a1.grnno AS grnno,
        a1.grndate AS grndate,
        d.state_codeno AS state_codeno,
        d.state_name AS state_name,
        (((SUM(a1.value) + SUM(a1.cgst_amt)) + SUM(a1.sgst_amt)) + SUM(a1.igst_amt)) AS invamt,
        SUM(a1.value) AS value,
        SUM(a1.cgst_amt) AS cgst_amt,
        SUM(a1.sgst_amt) AS sgst_amt,
        SUM(a1.igst_amt) AS igst_amt,
        a1.cgst_per AS cgst_per,
        a1.sgst_per AS sgst_per,
        a1.igst_per AS igst_per,
        0 AS cess_amount,
        'MT' AS uom,
        SUM(a1.rect_grnqty) AS recdqty,
        'WASTE PAPER' AS itemname
    FROM
        (((SELECT 
            c.itmh_hsncode AS hsn_code,
                a.rech_no AS grnno,
                a.rech_date AS grndate,
                a.rech_sup_code AS rech_sup_code,
                a.rech_billno AS billno,
                a.rech_billdate AS billdate,
                SUM(b.rect_itemvalue) AS value,
                ROUND(((SUM(b.rect_itemvalue) * a.rech_cgst_per) / 100), 0) AS cgst_amt,
                ROUND(((SUM(b.rect_itemvalue) * a.rech_sgst_per) / 100), 0) AS sgst_amt,
                ROUND(((SUM(b.rect_itemvalue) * a.rech_igst_per) / 100), 0) AS igst_amt,
                a.rech_cgst_per AS cgst_per,
                a.rech_sgst_per AS sgst_per,
                a.rech_igst_per AS igst_per,
                SUM(b.rect_grnqty) AS rect_grnqty,
                'WASTER PAPER' AS itemname
        FROM
            (((trnrm_receipt_handling a1
        JOIN trnrm_receipt_header a)
        JOIN trnrm_receipt_trailer b)
        JOIN masrm_item_header c)
        WHERE
            ((a.rech_seqno = b.rect_hdseqno)
                AND (a.rech_compcode IN ('$compcode'))
                AND (a.rech_fincode = '$finid')
                AND (b.rect_item_code = c.itmh_code)
                AND (a1.rech_pwvoudate >= '$fromdate')
                AND (a1.rech_pwvoudate <= '$todate')
                AND (a.rech_compcode = a1.rech_compcode)
                AND (a.rech_fincode = a1.rech_fincode)
                AND (a.rech_no = a1.rech_grnno)
                AND (a1.rech_pwvouno <> ''))
        GROUP BY c.itmh_hsncode , a.rech_no , a.rech_date , a.rech_sup_code , a.rech_billno , a.rech_billdate , a.rech_cgst_per , a.rech_sgst_per , a.rech_igst_per) a1
        JOIN maspur_supplier_master c)
        JOIN mas_state d)
    WHERE
        ((a1.rech_sup_code = c.sup_code)
            AND (c.sup_state = d.state_code))
    GROUP BY c.sup_gstin , c.sup_refname , a1.hsn_code , a1.billno , a1.billdate , a1.grnno , a1.grndate , d.state_codeno , d.state_name , a1.cgst_per , a1.sgst_per , a1.igst_per 
    UNION ALL SELECT 
        'FU' AS type,
        c.sup_gstin AS sup_gstin,
        c.sup_refname AS sup_refname,
        a1.hsn_code AS hsn_code,
        a1.billno AS billno,
        a1.billdate AS billdate,
        a1.grnno AS grnno,
        a1.grndate AS grndate,
        d.state_codeno AS state_codeno,
        d.state_name AS state_name,
        (((SUM(a1.value) + SUM(a1.cgst_amt)) + SUM(a1.sgst_amt)) + SUM(a1.igst_amt)) AS invamt,
        SUM(a1.value) AS value,
        SUM(a1.cgst_amt) AS cgst_amt,
        SUM(a1.sgst_amt) AS sgst_amt,
        SUM(a1.igst_amt) AS igst_amt,
        a1.cgst_per AS cgst_per,
        a1.sgst_per AS sgst_per,
        a1.igst_per AS igst_per,
        a1.rech_cess_amount AS cess_amount,
        'MT' AS uom,
        SUM(a1.rect_grnqty) AS recdqty,
        'FUEL' AS itemname
    FROM
        (((SELECT 
            c.itmh_hsncode AS hsn_code,
                a.rech_no AS grnno,
                a.rech_date AS grndate,
                a.rech_sup_code AS rech_sup_code,
                a.rech_billno AS billno,
                a.rech_billdate AS billdate,
                SUM(b.rect_itemvalue) AS value,
                ROUND(((SUM(b.rect_itemvalue) * a.rech_cgst_per) / 100), 0) AS cgst_amt,
                ROUND(((SUM(b.rect_itemvalue) * a.rech_sgst_per) / 100), 0) AS sgst_amt,
                ROUND(((SUM(b.rect_itemvalue) * a.rech_igst_per) / 100), 0) AS igst_amt,
                a.rech_cgst_per AS cgst_per,
                a.rech_sgst_per AS sgst_per,
                a.rech_igst_per AS igst_per,
                a.rech_cess_amount AS rech_cess_amount,
                SUM(b.rect_grnqty) AS rect_grnqty
        FROM
            ((trnfu_receipt_header a
        JOIN trnfu_receipt_trailer b)
        JOIN masfu_item_header c)
        WHERE
            ((a.rech_seqno = b.rect_hdseqno)
                AND (a.rech_compcode IN ('$compcode'))
                AND (a.rech_fincode = '$finid')
                AND (b.rect_item_code = c.itmh_code)
                AND (a.rech_accdate >= '$fromdate')
                AND (a.rech_accdate <= '$todate'))
        GROUP BY c.itmh_hsncode , a.rech_no , a.rech_date , a.rech_sup_code , a.rech_billno , a.rech_billdate , a.rech_cgst_per , a.rech_sgst_per , a.rech_igst_per , a.rech_cess_amount) a1
        JOIN maspur_supplier_master c)
        JOIN mas_state d)
    WHERE
        ((a1.rech_sup_code = c.sup_code)
            AND (c.sup_state = d.state_code))
    GROUP BY c.sup_gstin , c.sup_refname , a1.hsn_code , a1.billno , a1.billdate , a1.grnno , a1.grndate , d.state_codeno , d.state_name , a1.cgst_per , a1.sgst_per , a1.igst_per , a1.rech_cess_amount 
    UNION ALL SELECT 
        'DC' AS type,
        c.sup_gstin AS sup_gstin,
        c.sup_refname AS sup_refname,
        '' AS hsn_code,
        b.inv_billno AS billno,
        b.inv_billdate AS billdate,
        a.invh_dutyvouno AS grnno,
        a.invh_date AS grndate,
        d.state_codeno AS state_codeno,
        d.state_name AS state_name,
        SUM(b.inv_bill_amount) AS invamt,
        SUM(b.inv_taxable) AS value,
        SUM(b.inv_cgst_amt) AS cgst_amt,
        SUM(b.inv_sgst_amt) AS sgst_amt,
        SUM(b.inv_igst_amt) AS igst_amt,
        b.inv_cgst_per AS cgst_per,
        b.inv_sgst_per AS sgst_per,
        b.inv_igst_per AS igst_per,
        0 AS cess_amount,
        'DC' AS uom,
        0 AS recdqty,
        'IMPORT DC' AS itemname
    FROM
        (((trnirm_invoice_header a
        JOIN trnirm_invoice_handling b)
        JOIN maspur_supplier_master c)
        JOIN mas_state d)
    WHERE
        ((a.invh_seqno = b.inv_hdcode)
            AND (a.invh_compcode IN ('$compcode'))
            AND (a.invh_fincode = '$finid')
            AND (b.inv_freight = 0)
            AND (b.inv_billdate >= '$fromdate')
            AND (b.inv_billdate <= '$todate')
            AND (b.inv_supcode = c.sup_code)
            AND (c.sup_state = d.state_code))
    GROUP BY c.sup_gstin , c.sup_refname , b.inv_billno , b.inv_billno , b.inv_billdate , a.invh_dutyvouno , a.invh_date , d.state_codeno , d.state_name , b.inv_cgst_per , b.inv_sgst_per , b.inv_igst_per 
    UNION ALL SELECT 
        'BE' AS type,
        c.sup_gstin AS sup_gstin,
        c.sup_refname AS sup_refname,
        '' AS hsn_code,
        a.obe_billno AS billno,
        a.obe_billdate AS billdate,
        SUBSTR(a.obe_acc_vouno, 3, 4) AS grnno,
        a.obe_date AS grndate,
        d.state_codeno AS state_codeno,
        d.state_name AS state_name,
        SUM(a.obe_total_amt) AS invamt,
        SUM(a.obe_taxable_value) AS value,
        SUM(a.obe_cgst_amt) AS cgst_amt,
        SUM(a.obe_sgst_amt) AS sgst_amt,
        SUM(a.obe_igst_amt) AS igst_amt,
        a.obe_cgst_per AS cgst_per,
        a.obe_sgst_per AS sgst_per,
        a.obe_igst_per AS igst_per,
        0 AS cess_amount,
        'BE' AS uom,
        0 AS recdqty,
        'BILL ENTRY' AS itemname
    FROM
        ((trn_acc_other_expenses a
        JOIN maspur_supplier_master c)
        JOIN mas_state d)
    WHERE
        ((a.obe_comp_code IN ('$compcode'))
            AND (a.obe_fincode = '$finid')
            AND (a.obe_date >= '$fromdate')
            AND (a.obe_date <= '$todate')
            AND (a.obe_party = c.sup_code)
            AND (c.sup_state = d.state_code))
    GROUP BY c.sup_gstin , c.sup_refname , a.obe_billno , a.obe_billdate , a.obe_acc_vouno , a.obe_date , d.state_codeno , d.state_name , a.obe_cgst_per , a.obe_sgst_per , a.obe_igst_per 
    UNION ALL SELECT 
        'WG' AS type,
        c.sup_gstin AS sup_gstin,
        c.sup_refname AS sup_refname,
        '' AS hsn_code,
        a.wg_ref_no AS billno,
        a.wg_ref_date AS billdate,
        a.wg_vou_no AS grnno,
        a.wg_vou_date AS grndate,
        d.state_codeno AS state_codeno,
        d.state_name AS state_name,
        SUM(a.wg_tot_amt) AS invamt,
        SUM(a.wg_value) AS value,
        SUM(a.wg_cgst_amt) AS cgst_amt,
        SUM(a.wg_sgst_amt) AS sgst_amt,
        SUM(a.wg_igst_amt) AS igst_amt,
        a.wg_cgst_per AS cgst_per,
        a.wg_sgst_per AS sgst_per,
        a.wg_igst_per AS igst_per,
        0 AS cess_amount,
        'WG' AS uom,
        0 AS recdqty,
        'WORK ORDER' AS itemname
    FROM
        ((trn_acc_wogrn a
        JOIN maspur_supplier_master c)
        JOIN mas_state d)
    WHERE
        ((a.wg_comp_code IN ('$compcode'))
            AND (a.wg_fin_year = '$finid')
            AND (a.wg_vou_date >= '$fromdate')
            AND (a.wg_vou_date <= '$todate')
            AND (a.wg_party = c.sup_code)
            AND (c.sup_state = d.state_code))
    GROUP BY c.sup_gstin , c.sup_refname , a.wg_ref_no , a.wg_ref_date , a.wg_vou_no , a.wg_vou_date , d.state_codeno , d.state_name , a.wg_cgst_per , a.wg_sgst_per , a.wg_igst_per");
 
}
       
 
?>
