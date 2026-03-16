param(
    [string]$CommitMessage = "Auto update"
)

Write-Host "Adding all changes..."
git add .

Write-Host "Committing changes with message: '$CommitMessage'"
git commit -m $CommitMessage

Write-Host "Pushing to GitHub..."
git push origin main

Write-Host "Done! All changes have been pushed to GitHub."
