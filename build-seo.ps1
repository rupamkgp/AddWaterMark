$ErrorActionPreference = "Stop"

$ConfigPath = "data\seo-config.json"
$TemplatePath = "index.html"
$DistDir = "dist"

Write-Host "Reading configuration..."
$configJson = Get-Content -Raw -Path $ConfigPath | ConvertFrom-Json
$templateHtml = Get-Content -Raw -Path $TemplatePath

# Clean up Dist
if (Test-Path $DistDir) {
    Remove-Item -Recurse -Force $DistDir
}
New-Item -ItemType Directory -Force -Path $DistDir | Out-Null

# Copy static assets to dist root
Write-Host "Copying static assets..."
Copy-Item "app.js" -Destination "$DistDir\app.js"
Copy-Item "canvas.js" -Destination "$DistDir\canvas.js"
Copy-Item "devices.js" -Destination "$DistDir\devices.js"
Copy-Item "styles.css" -Destination "$DistDir\styles.css"

# Generate About Us footer html
$footerHtml = "
<div class='mt-12 mb-8 border-t border-gray-200 dark:border-gray-800 pt-8'>
    <div class='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
            <h2 class='text-xl font-bold mb-4'>About Us</h2>
            <p class='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>
                We are a team of photography enthusiasts and developers dedicated to providing the best tools for creators. Our mission is to help you showcase your gear and protect your creative work with professional-grade watermarks that are easy to apply and completely free.
            </p>
        </div>
        <div>
            <h2 class='text-xl font-bold mb-4'>About AddWatermark</h2>
            <p class='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>
                AddWatermark is a 100% free online tool designed to add authentic 'Shot On' watermarks to any photo. Whether you shoot with an iPhone, Samsung, Canon, or Nikon, our web application renders high-quality watermarks instantly in your browser without reducing image quality or requiring any downloads.
            </p>
        </div>
    </div>
</div>"

# Generate main index.html in dist root
$mainHtml = $templateHtml -replace "\{\{TITLE\}\}", "AddWatermark - Pro Camera Watermarks"
$mainHtml = $mainHtml -replace "\{\{DESCRIPTION\}\}", "Free online tool to add Shot On watermarks to your photos."
$mainHtml = $mainHtml -replace "\{\{SEO_CONTENT\}\}", ""
$mainHtml = $mainHtml -replace "\{\{PAGE_CONTEXT\}\}", ""
# For main index, the links are relative to root, not ../
$rootLinksHtml = $footerHtml -replace "\.\./", ""
$mainHtml = $mainHtml -replace "\{\{INTERNAL_LINKS\}\}", $rootLinksHtml

Set-Content -Path "$DistDir\index.html" -Value $mainHtml

Write-Host "Generating SEO pages..."
foreach ($page in $configJson.pages) {
    $pageDir = "$DistDir\$($page.path)"
    New-Item -ItemType Directory -Force -Path $pageDir | Out-Null
    
    $templateObj = if ($page.type -eq 'device') { $configJson.templates.device } else { $configJson.templates.camera }
    
    $pageTitle = $templateObj.title -replace "\{\{NAME\}\}", $page.name
    $pageDesc = $templateObj.description -replace "\{\{NAME\}\}", $page.name
    $pageContent = $templateObj.content -replace "\{\{NAME\}\}", $page.name
    
    $pageHtml = $templateHtml
    $pageHtml = $pageHtml -replace "\{\{TITLE\}\}", $pageTitle
    $pageHtml = $pageHtml -replace "\{\{DESCRIPTION\}\}", $pageDesc
    $pageHtml = $pageHtml -replace "\{\{SEO_CONTENT\}\}", $pageContent
    $pageHtml = $pageHtml -replace "\{\{PAGE_CONTEXT\}\}", $page.context
    $pageHtml = $pageHtml -replace "\{\{INTERNAL_LINKS\}\}", $footerHtml
    
    # Update asset paths to be relative to the subfolder
    $pageHtml = $pageHtml -replace 'src="app.js"', 'src="../app.js"'
    $pageHtml = $pageHtml -replace 'src="canvas.js"', 'src="../canvas.js"'
    $pageHtml = $pageHtml -replace 'src="devices.js"', 'src="../devices.js"'
    $pageHtml = $pageHtml -replace 'href="styles.css"', 'href="../styles.css"'
    
    Set-Content -Path "$pageDir\index.html" -Value $pageHtml
    Write-Host "Generated $($page.path)"
}

Write-Host "Done! All pages generated in $DistDir"
