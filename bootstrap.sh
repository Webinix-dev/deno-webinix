#!/bin/bash

# This script downloads the trusted Webinix compiled library by GitHub CI for Linux.

echo "Webinix Deno Bootstrap"
echo

# Detect OS (macOS / Linux)
OS="linux"
CC="gcc"
EXT="so"
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
    CC="clang"
    EXT="dylib"
fi

# Webinix MSVC archive
BASE_URL="https://github.com/webinix-dev/webinix/releases/download/2.4.0/webinix-${OS}-${CC}"

# Check the CPU architecture
ARCH=$(uname -m)
if [ "$ARCH" == "x86_64" ]; then
    # x86 64Bit
    WEBUI_MSVC_URL="${BASE_URL}-x64.zip"
elif [ "$ARCH" == "i386" ] || [ "$ARCH" == "i686" ]; then
    # x86 32Bit
    WEBUI_MSVC_URL="${BASE_URL}.zip"
elif [ "$ARCH" == "armv7l" ]; then
    # ARM 32Bit
    WEBUI_MSVC_URL="${BASE_URL}-arm.zip"
elif [ "$ARCH" == "aarch64" ]; then
    # ARM 64Bit
    WEBUI_MSVC_URL="${BASE_URL}-arm64.zip"
else
    echo "Error: Unknown architecture '$ARCH'"
    exit 1
fi

# Creating the temporary cache folder
mkdir -p "cache"
mkdir -p "cache/webinix-${OS}-${CC}-x64"

# Download the archive using wget or curl
echo "Downloading [$WEBUI_MSVC_URL]..."
wget -q "$WEBUI_MSVC_URL" -O "cache/webinix-${OS}-${CC}-x64.zip" || curl -L "$WEBUI_MSVC_URL" -o "cache/webinix-${OS}-${CC}-x64.zip"

# Extract archive
echo "Extracting..."
unzip -o -q "cache/webinix-${OS}-${CC}-x64.zip" -d "cache"

# Copy library
echo "Copying..."
mkdir -p "src/webinix-${OS}-${CC}-x64"
cp -f "cache/webinix-2.${EXT}" "src/webinix-${OS}-${CC}-x64/webinix-2.${EXT}"

# Remove cache folder
echo "Cleaning..."
rm -rf "cache"
