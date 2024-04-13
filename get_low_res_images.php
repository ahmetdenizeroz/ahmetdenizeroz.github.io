<?php
// Define the path to the low-resolution image folder
$lowResFolder = 'low_res_pics/';

// Get a list of files in the low-resolution folder
$files = scandir($lowResFolder);

// Initialize an empty array to store image URLs
$imageUrls = [];

// Iterate through the files
foreach ($files as $file) {
    // Exclude . and .. (directory pointers)
    if ($file !== '.' && $file !== '..') {
        // Construct the URL for the low-resolution image
        $lowResUrl = $lowResFolder . $file;
        // Construct the URL for the corresponding high-resolution image
        $highResUrl = 'high_res_pics/' . $file; // Assuming the high-resolution images are in a folder named 'high_res_pics'
        // Add an object to the array containing the name of the image file and both low and high-resolution URLs
        $imageUrls[] = array(
            'name' => $file,
            'lowRes' => $lowResUrl,
            'highRes' => $highResUrl
        );
    }
}

// Send the array as JSON response
header('Content-Type: application/json');
echo json_encode($imageUrls);
?>
