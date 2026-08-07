<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$storageFile = __DIR__ . '/storage/roles.json';

if (!file_exists(dirname($storageFile))) {
    mkdir(dirname($storageFile), 0777, true);
}

// Ensure default storage file exists
if (!file_exists($storageFile)) {
    copy(__DIR__ . '/default_roles.json', $storageFile);
}

$rolesData = json_decode(file_get_contents($storageFile), true) ?? [];

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET' && str_contains($uri, '/api/roles')) {
    echo json_encode(['status' => 'success', 'data' => array_values($rolesData)]);
    exit;
}

if ($method === 'POST' && str_contains($uri, '/api/roles')) {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Role ID is required']);
        exit;
    }

    $rolesData[$input['id']] = $input;
    file_put_contents($storageFile, json_encode($rolesData, JSON_PRETTY_PRINT));

    echo json_encode(['status' => 'success', 'role' => $input]);
    exit;
}

if ($method === 'DELETE' && str_contains($uri, '/api/roles')) {
    preg_match('/\/api\/roles\/([a-zA-Z0-9_\-]+)/', $uri, $matches);
    $roleId = $matches[1] ?? null;

    if ($roleId && isset($rolesData[$roleId])) {
        unset($rolesData[$roleId]);
        file_put_contents($storageFile, json_encode($rolesData, JSON_PRETTY_PRINT));
        echo json_encode(['status' => 'success', 'deleted' => $roleId]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Role not found']);
    }
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Endpoint not found']);
