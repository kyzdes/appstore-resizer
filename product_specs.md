# Product Specifications: App Store Screenshot Converter

## 1. Project Overview

The App Store Screenshot Converter is a web-based utility designed to help mobile application developers easily resize their application screenshots to the specific dimensions required by the Apple App Store Connect.

The application is a purely client-side tool, meaning all image processing and file handling occurs directly in the user's browser. No files are ever uploaded to a server, ensuring user privacy and data security.

## 2. Core Features

-   **Image Upload:** Users can upload up to 10 images at a time, in either JPEG or PNG format.
-   **Resolution Selection:** A comprehensive list of required resolutions for iPhone, iPad, and Apple Watch is provided for the user to select from.
-   **Client-Side Image Resizing:** The application resizes the uploaded images to the selected dimensions using the HTML5 Canvas API.
-   **Aspect Ratio Handling:** The resizing logic maintains the original aspect ratio of the image, covering the target dimensions and cropping any overflow (a "cover" resize).
-   **ZIP Archive Creation:** All generated images are packaged into a single `.zip` file for convenient download. The archive maintains a folder structure based on the device and screen diagonal.
-   **Dark/Light Mode:** The user interface supports both light and dark themes.
-   **Localization:** The interface is available in both English and Russian.

## 3. Supported Devices and Resolutions

The application supports the following devices and resolutions, which are sourced from the `src/resolutions.json` file:

### iPhone

-   **6.9"**
    -   1260x2736
    -   2736x1260
    -   1320x2868
    -   2868x1320
    -   1290x2796
    -   2796x1290
-   **6.5"**
    -   1242x2688
    -   2688x1242
    -   1284x2778
    -   2778x1284
-   **6.3"**
    -   1206x2622
    -   2622x1206
    -   1179x2556
    -   2556x1179
-   **6.1"**
    -   1125x2436
    -   2436x1125
    -   1080x2340
    -   2340x1080
    -   2532x1170
    -   1170x2532

### iPad

-   **13"**
    -   2064x2752
    -   2752x2064
    -   2048x2732
    -   2732x2048
-   **12.9"**
    -   2048x2732
    -   2732x2048
-   **11"**
    -   1668x2420
    -   2420x1668
    -   1668x2388
    -   2388x1668
    -   1640x2360
    -   2360x1640
    -   2266x1488
    -   1488x2266
-   **10.5"**
    -   1668x2224
    -   2224x1668
-   **9.7"**
    -   1536x2008
    -   1536x2048
    -   2048x1496
    -   2048x1536
    -   768x1004
    -   768x1024
    -   1024x748
    -   1024x768

### Apple Watch

-   **Ultra 3**
    -   422x514
    -   410x502
-   **Series 11**
    -   416x496
-   **Series 9**
    -   396x484
-   **Series 6**
    -   368x448
-   **Series 3**
    -   312x390

## 4. Image Processing and Archiving

The core logic is handled by the `processImages` function in `src/utils/imageProcessor.ts`.

1.  **Image Loading:** Each uploaded file is loaded into an `HTMLImageElement` using a `FileReader`.
2.  **Resizing:** For each selected resolution, a new `<canvas>` element is created with the target dimensions. The source image is drawn onto the canvas, centered, and scaled to cover the entire canvas while maintaining its aspect ratio. Any parts of the image that extend beyond the canvas dimensions are cropped. The background of the canvas is filled with white to handle any transparency in PNG files.
3.  **Blob Conversion:** The content of the canvas is converted into a `Blob` (a file-like object). The format is preserved (PNG remains PNG, JPEG remains JPEG).
4.  **Archiving:**
    -   A new `JSZip` instance is created.
    -   Each resized image blob is added to the zip archive.
    -   The files are organized into folders based on the device type and screen diagonal (e.g., `iPhone/6.9-inch/`).
    -   The filename convention is `{original_filename}_{width}x{height}.{extension}`.
5.  **Download:** The final `.zip` archive is generated and the user's browser is prompted to download the file.

## 5. Technical Details

-   **Frontend Framework:** React with Vite
-   **UI Components:** shadcn/ui
-   **Image Processing:** HTML5 Canvas API
-   **Archiving:** JSZip library
-   **Styling:** Tailwind CSS
-   **Deployment:** Docker (Nginx serving the static build) with Caddy as a reverse proxy.
