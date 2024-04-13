<?php
$folder = 'path/to/your/image/folder/';
$files = scandir($folder);
$imageUrls = [];

foreach ($files as $file) {
    // Check if the file is an image (you may need to adjust this condition based on your file naming conventions)
    if (in_array(pathinfo($file, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'gif'])) {
        $imageUrls[] = $folder . $file;
    }
}

// Output the image URLs as JSON
echo json_encode($imageUrls);
?>
