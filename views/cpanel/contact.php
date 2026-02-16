<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$server_name="localhost";
$user_name="alonnu_admin";
$password="contact1us";
$database_name="alonnu_contact";

// connection to the database
$conn = new mysqli($server_name, $user_name, $password, $database_name);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// fetching form data
$fullName  = $_POST['fullName'];
$email     = $_POST['email'];
$phone     = $_POST['phone'];
$username  = $_POST['username'];
$issueType = $_POST['issueType'];
$message   = $_POST['message'];

// add data to the database
$sql = "INSERT INTO contact (fullName, email, phone, username, issueType, message)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param("ssssss", $fullName, $email, $phone, $username, $issueType, $message);

if ($stmt->execute()) {
    $caseId = $conn->insert_id;
} else {
    echo " Error: " . $stmt->error;
    exit();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Response</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <style>
        body { background-color: #f4f6f9; }
        #response {
            margin: 8% auto;
            width: 70%;
            max-width: 720px;
            border: solid 2px #17a2b8;
            background-color: #dff6fb;
            border-radius: 12px;
            padding: 22px;
            text-align: center;
            font-family: Arial, sans-serif;
        }
        .caseid { font-weight: bold; font-size: 1.2rem; }
    </style>
</head>
<body>
    <div id="response">
        <h4>✅ Case submitted successfully!</h4>
        <div class="caseid">Your Case ID: <?php echo $caseId; ?></div>
        <p class="mt-3">We will contact you at <strong><?php echo htmlspecialchars($email); ?></strong></p>
        <a class="btn btn-info mt-2" href="contact.html">Submit another case</a>
    </div>
</body>
</html>
