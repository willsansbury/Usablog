<?php
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"" . stripcslashes($_REQUEST['csv_name']) . "\"");
$data=stripcslashes($_REQUEST['csv_text']);
echo $data; 
?>