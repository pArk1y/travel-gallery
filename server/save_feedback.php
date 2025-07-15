<?php
$host = "localhost";
$user = "root";
$password = ""; // обычно пустой в XAMPP
$dbname = "travel_gallery";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
  die("Ошибка подключения: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = htmlspecialchars($_POST['name']);
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $message = htmlspecialchars($_POST['message']);

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Неверный формат email.";
    exit;
  }

  $stmt = $conn->prepare("INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $name, $email, $message);

  if ($stmt->execute()) {
    echo "Отзыв успешно отправлен!";
  } else {
    echo "Ошибка сохранения отзыва.";
  }

  $stmt->close();
}

$conn->close();

header("Location: ../contact.html");
exit;
?>