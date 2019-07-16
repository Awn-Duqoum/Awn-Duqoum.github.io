<?php 

$Filename = $_REQUEST["CameraType"]."_Headers.txt";

$handle = fopen( $Filename , "r");

$Headers = "";

if ($handle) {
    while (($line = fgets($handle)) !== false) {
        if($Headers = ""){
			$Headers += $line;
		}
		else{
			$Headers += "%";
			$Headers += $line
		}
    }
	echo $Headers;
    fclose($handle);
} else {
    echo $Headers;
} 

?>