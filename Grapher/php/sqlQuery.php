 <?php
$serverName = "PIPPIN"; //serverName\instanceName
$connectionInfo = array( "Database"=>"NDI-HUGO", "UID"=>"readhugo", "PWD"=>"hugoread");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn ) {
    echo "Connection established to Microsoft SQL Server - wooh yeah!<br /><br />";

                $server_info = sqlsrv_server_info( $conn);
                if( $server_info ) {
                                foreach( $server_info as $key => $value) {
                                   echo $key.": ".$value."<br />";
                                }
                } else {
                                  die( print_r( sqlsrv_errors(), true));
                }
                
                if( $client_info = sqlsrv_client_info( $conn)) {
                                foreach( $client_info as $key => $value) {
                                                echo $key.": ".$value."<br />";
                                }
                } else {
                                echo "Error in retrieving client info.<br />";
                }
                echo "<br />";
                $sql = "SELECT * FROM Results";
                echo $sql."<br />";
                $stmt = sqlsrv_query($conn, $sql);
                if( $stmt === false) {
                   die( print_r( sqlsrv_errors(), true));
                }

                $numFields = sqlsrv_num_fields( $stmt );
                echo $numFields;

                while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
      echo $row['EMP_EmployeeID'].", ".$row['EMP_LastName'].", ".$row['EMP_FirstName']."<br />";
}

                sqlsrv_free_stmt( $stmt);
                sqlsrv_close( $conn );
?>