#!/bin/bash
set -e

echo "🔍 Checking if COVID-19 dataset exists..."

# Use /tmp which has write permissions inside container
CSV_FILE="/tmp/owid-covid-data.csv"
DATASET_URL="https://github.com/owid/covid-19-data/raw/master/public/data/owid-covid-data.csv"

if [ -f "$CSV_FILE" ]; then
    echo "✅ Dataset already exists: $CSV_FILE"
    FILE_SIZE=$(du -h "$CSV_FILE" | cut -f1)
    echo "📊 File size: $FILE_SIZE"
else
    echo "📥 Downloading COVID-19 dataset from OWID..."
    echo "🌐 URL: $DATASET_URL"

    # Download with curl (available in postgres image)
    if command -v curl &> /dev/null; then
        curl -L -o "$CSV_FILE" "$DATASET_URL"
    elif command -v wget &> /dev/null; then
        wget -O "$CSV_FILE" "$DATASET_URL"
    else
        echo "❌ Error: Neither curl nor wget found. Cannot download dataset."
        exit 1
    fi

    if [ -f "$CSV_FILE" ]; then
        FILE_SIZE=$(du -h "$CSV_FILE" | cut -f1)
        echo "✅ Dataset downloaded successfully!"
        echo "📊 File size: $FILE_SIZE"
    else
        echo "❌ Error: Download failed"
        exit 1
    fi
fi

echo "🚀 Ready to initialize database..."
