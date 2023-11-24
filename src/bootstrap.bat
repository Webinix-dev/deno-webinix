@echo off
SETLOCAL

:: This script downloads the trusted Webinix compiled library by GitHub CI for Windows.

IF "%1"=="minimal" (
    goto MINIMAL
)

:: --- Full -------------------------------------
:: Download Webinix library for all supported OS.
echo Webinix Deno Bootstrap
echo.

:: Creating the temporary cache folder
mkdir "cache" 2>nul 1>nul

:: Nightly Build
:: SET "LINUX_ARM=https://github.com/webinix-dev/webinix/releases/download/nightly/webinix-linux-gcc-arm.zip"
:: SET "LINUX_ARM64=https://github.com/webinix-dev/webinix/releases/download/nightly/webinix-linux-gcc-arm64.zip"
:: SET "LINUX_X64=https://github.com/webinix-dev/webinix/releases/download/nightly/webinix-linux-gcc-x64.zip"
:: SET "MACOS_ARM64=https://github.com/webinix-dev/webinix/releases/download/nightly/webinix-macos-clang-arm64.zip"
:: SET "MACOS_X64=https://github.com/webinix-dev/webinix/releases/download/nightly/webinix-macos-clang-x64.zip"
:: SET "WINDOWS_MSVC_X64=https://github.com/webinix-dev/webinix/releases/download/nightly/webinix-windows-msvc-x64.zip"

:: Release
SET "LINUX_ARM=https://github.com/webinix-dev/webinix/releases/download/2.4.1/webinix-linux-gcc-arm.zip"
SET "LINUX_ARM64=https://github.com/webinix-dev/webinix/releases/download/2.4.1/webinix-linux-gcc-arm64.zip"
SET "LINUX_X64=https://github.com/webinix-dev/webinix/releases/download/2.4.1/webinix-linux-gcc-x64.zip"
SET "MACOS_ARM64=https://github.com/webinix-dev/webinix/releases/download/2.4.1/webinix-macos-clang-arm64.zip"
SET "MACOS_X64=https://github.com/webinix-dev/webinix/releases/download/2.4.1/webinix-macos-clang-x64.zip"
SET "WINDOWS_MSVC_X64=https://github.com/webinix-dev/webinix/releases/download/2.4.1/webinix-windows-msvc-x64.zip"

:: Download and extract archives
CALL :DOWNLOAD_AND_EXTRACT %LINUX_ARM% webinix-linux-gcc-arm webinix-2.so
CALL :DOWNLOAD_AND_EXTRACT %LINUX_ARM64% webinix-linux-gcc-arm64 webinix-2.so
CALL :DOWNLOAD_AND_EXTRACT %LINUX_X64% webinix-linux-gcc-x64 webinix-2.so
CALL :DOWNLOAD_AND_EXTRACT %MACOS_ARM64% webinix-macos-clang-arm64 webinix-2.dylib
CALL :DOWNLOAD_AND_EXTRACT %MACOS_X64% webinix-macos-clang-x64 webinix-2.dylib
CALL :DOWNLOAD_AND_EXTRACT %WINDOWS_MSVC_X64% webinix-windows-msvc-x64 webinix-2.dll

:: Remove cache folder
echo * Cleaning...
rmdir /S /Q "cache" 2>nul 1>nul
exit /b

:: Download and Extract Function
:DOWNLOAD_AND_EXTRACT
echo * Downloading [%1]...
SET FULL_URL=%1
SET FILE_NAME=%2
SET LIB_DYN=%3
SET LIB_STATIC=%4
powershell -Command "Invoke-WebRequest '%FULL_URL%' -OutFile 'cache\%FILE_NAME%.zip'"
echo * Extracting [%FILE_NAME%.zip]...
mkdir "cache\%FILE_NAME%" 2>nul 1>nul
tar -xf "cache\%FILE_NAME%.zip" -C "cache"
IF NOT "%LIB_DYN%"=="" (
    :: Copy dynamic library
    echo * Copying [%LIB_DYN%]...
    mkdir "%FILE_NAME%" 2>nul 1>nul
    copy /Y "cache\%FILE_NAME%\%LIB_DYN%" "%FILE_NAME%\%LIB_DYN%" 2>nul 1>nul
)
IF NOT "%LIB_STATIC%"=="" (
    :: Copy dynamic library
    echo * Copying [%LIB_STATIC%]...
    mkdir "%FILE_NAME%" 2>nul 1>nul
    copy /Y "cache\%FILE_NAME%\%LIB_STATIC%" "%FILE_NAME%\%LIB_STATIC%" 2>nul 1>nul
)
GOTO :EOF

:: --- Minimal ----------------------------------
:: Download Webinix library for only the current OS.
:MINIMAL

SET "BASE_URL=https://github.com/webinix-dev/webinix/releases/download/2.4.1/"

:: Check the CPU architecture
IF "%PROCESSOR_ARCHITECTURE%"=="x86" (
    :: x86 32Bit
    :: SET "FILENAME=webinix-windows-msvc-x86"
    ECHO Error: Windows x86 32Bit architecture is not supported yet
    exit /b
) ELSE IF "%PROCESSOR_ARCHITECTURE%"=="AMD64" (
    :: x86 64Bit
    SET "FILENAME=webinix-windows-msvc-x64"
) ELSE IF "%PROCESSOR_ARCHITECTURE%"=="ARM" (
    :: ARM 32Bit
    :: SET "FILENAME=webinix-windows-msvc-arm"
    ECHO Error: Windows ARM architecture is unsupported yet
    exit /b
) ELSE IF "%PROCESSOR_ARCHITECTURE%"=="ARM64" (
    :: ARM 64Bit
    :: SET "FILENAME=webinix-windows-msvc-arm64"
    ECHO Error: Windows ARM64 architecture is unsupported yet
    exit /b
) ELSE (
    ECHO Error: Unknown architecture '%PROCESSOR_ARCHITECTURE%'
    exit /b
)

:: Creating the temporary cache folder
mkdir "cache" 2>nul 1>nul
mkdir "cache\%FILENAME%" 2>nul 1>nul

:: Download the archive using PowerShell
powershell -Command "Invoke-WebRequest '%BASE_URL%%FILENAME%.zip' -OutFile 'cache\%FILENAME%.zip'"

:: Extract archive (Windows 10 and later)
tar -xf "cache\%FILENAME%.zip" -C "cache"

:: Copy library
mkdir "%FILENAME%" 2>nul 1>nul
copy /Y "cache\%FILENAME%\webinix-2.dll" "%FILENAME%\webinix-2.dll" 2>nul 1>nul

:: Remove cache folder
rmdir /S /Q "cache" 2>nul 1>nul

ENDLOCAL
