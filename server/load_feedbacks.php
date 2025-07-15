<?php
$host = "localhost";
$user = "root";
$password = ""; // обычно пустой в XAMPP
$dbname = "travel_gallery";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
  die("Ошибка подключения: " . $conn->connect_error);
}

$sql = "SELECT id, name, email, message, created_at FROM feedback ORDER BY created_at DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "<ul>";
  while($row = $result->fetch_assoc()) {
    echo "<li><strong>" . $row["name"] . "</strong> (" . $row["email"] . ") - " . $row["message"] . " <small>(" . $row["created_at"] . ")</small></li>";
  }
  echo "</ul>";
} else {
  echo "<p>Пока нет отзывов.</p>";
}

$conn->close();
?>