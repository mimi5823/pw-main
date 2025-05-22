#!/bin/bash

# Find all admin TSX files
FILES=$(find src/app/admin -type f -name "*.tsx")

# Loop through each file and update the background color
for file in $FILES; do
  # Replace bg-gray-900 with bg-black and add shadow-lg
  sed -i 's/bg-gray-900 rounded-xl/bg-black rounded-xl shadow-lg/g' "$file"
  sed -i 's/bg-gray-900 border/bg-black border shadow-lg/g' "$file"
  
  # Add hover effect to cards
  sed -i 's/bg-black rounded-xl shadow-lg/bg-black rounded-xl shadow-lg hover:shadow-primary\/5 transition-all duration-300/g' "$file"
  
  # Update tables
  sed -i 's/bg-gray-900 rounded-xl border/bg-black rounded-xl border shadow-lg/g' "$file"
  
  echo "Updated $file"
done

echo "All admin card backgrounds updated to black with shadow effects"