<?php

    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $address1 = $_POST['address1'];
    $address2 = $_POST['address2'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $postcode = $_POST['postcode'];
    $payment = $_POST['paymentType'];

    
    date_default_timezone_set('Australia/Sydney');
    $statecurrent_time = date_default_timezone_get();
    date("Y-m-d");

        $conn = new mysqli('localhost', 'root', '', 'rent_history');
        if($conn->connect_error) {
            die('Connection Failed : '.$conn->connect_error);
        } else {
            $stmt = $conn->prepare("insert into payment(firstName, lastName, email, address1, address2, city, state, postcode, paymentType)
            values(?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssssis", $firstName, $lastName, $email, $address1, $address2, $city, $state, $postcode, $payment);
            $stmt->execute();
            $stmt->close();
            $conn->close();
        }
?>

<html>
        <a href="../index.html">Get back to home page</a>
        <script>
            
        alert('Payment Successful');
        </script>
</html>