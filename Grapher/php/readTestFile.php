<?php 

$Filename = __DIR__ . $_GET["fileName"];

$handle = fopen( $Filename , "r");

if ($handle) {
    while (($line = fgets($handle)) !== false) {
		$line = str_replace("\n","",$line);
		$line = str_replace("\r","",$line);
		echo '<option value="'.$line.'"ondblclick ="ChangeList()">'.$line.'</option>';
    }
    fclose($handle);
} else {
    echo "<h2>Error</h2>";
} 

?>