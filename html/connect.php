<?php

    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $address1 = $_POST['address1'];
    $address2 = $_POST['address2'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $postcode = $_POST['postcode'];
    $payment = $_POST['payment'];

    // $firstName = $_GET['firstName'];
    // $lastName = $_GET['lastName'];
    // $email = $_GET['email'];
    // $address1 = $_GET['address1'];
    // $address2 = $_GET['address2'];
    // $city = $_GET['city'];
    // $state = $_POST['state'];
    // $postcode = $_GET['postcode'];
    // $payment = $_GET['payment'];

        $conn = new mysqli('localhost', 'root', '', 'rent_history');
        $stmt = $conn->prepare("Insert payment information(firstName, lastName, email, address1, address2, city, state, postcode, payment)
            values(?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssis", $firstName, $lastName, $email, $address1, $address2, $city, $state, $postcode, $payment);
        $stmt->execute();
        echo "Payment successful";
        $stmt->close();
        $conn->close();

?>