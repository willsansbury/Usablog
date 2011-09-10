<?php
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"my-data.csv\"");
$data=stripcslashes($_REQUEST['csv_text']);
echo $data; 
?>