<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$action = $_GET['action'] ?? '';

$input = json_decode(file_get_contents("php://input"), true);

if ($action === "register") {
    // Ovdje bi išlo spremanje u bazu
    $response = [
        "success" => true,
        "message" => "Korisnik uspješno registriran!"
    ];
    echo json_encode($response);
}

elseif ($action === "login") {
    // Ovo je samo simulacija
    if ($input["email"] === "admin@shop.com" && $input["lozinka"] === "1234") {
        echo json_encode([
            "success" => true,
            "message" => "Prijava uspješna!",
            "user" => ["ime" => "Admin", "uloga" => "admin"]
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Neispravni podaci za prijavu."
        ]);
    }
}

else {
    echo json_encode(["success" => false, "message" => "Nepoznata akcija."]);
}
?>
