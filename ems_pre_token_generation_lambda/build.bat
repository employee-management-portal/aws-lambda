@echo off

echo ******************************************************************************************
echo ********************************** Build Script Starts ***********************************

echo ********************** Deleteing build and node_modules if Present ***********************
rmdir /s /q build
@REM rmdir /s /q node_modules

echo ************************************ Building project ************************************
@REM npm i
npm run build

echo *********************************** Build Script End *************************************
echo ******************************************************************************************
