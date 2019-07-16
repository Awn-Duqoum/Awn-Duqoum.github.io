 <?php
$command = $_GET["sqlCommand"];
$date = $_GET["date"];

$serverName = "THORIN";
$connectionInfo = array( "Database"=>"HUGO", "UID"=>"readhugo", "PWD"=>"hugoread");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn ) {
    $server_info = sqlsrv_server_info( $conn);    
	$stmt = sqlsrv_query($conn, $command);
                
	if( $stmt === false) {
    	die( print_r( sqlsrv_errors(), true));
    }
				
	$X = array();
	$Y = array();
				
	while( $line = sqlsrv_fetch_object ($stmt)) {
		if($date == "true"){
			array_push($X, date_format($line->NDI_Results_CreatedDate,"d-m-Y"));
		}
		else {
			array_push($X, $line->NDI_Results_SerialNbr);
		}
		array_push($Y, floatval($line->NDI_Results_Details_Value));
		
	}

	$returnJSON = array("X"=>$X ,"Y"=>$Y );
	
	echo json_encode($returnJSON);
	
	sqlsrv_free_stmt( $stmt);
	sqlsrv_close( $conn );
	
} else {
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}
?>