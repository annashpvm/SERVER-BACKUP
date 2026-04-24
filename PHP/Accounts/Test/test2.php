<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/ext-3.4.1/examples/ux/GroupSummary.js';
if (file_exists($path)) {
    echo '<script>' . file_get_contents($path) . '</script>';
} else {
    error_log("JS file not found: $path");
}
?>
