@echo off

echo ******************************************************************************************
echo ******************************** Deployment Script Starts ********************************
@REM cd .\build\
@REM ren .\build\index.js .build\index.mjs 
@REM cd ..
echo ******************************* Adding build into Zip *******************************
powershell Compress-Archive -Path .\build\index.mjs .\build.zip -Update
@REM powershell Compress-Archive -Path .\build\* .\build.zip -Force
@REM powershell Compress-Archive -Path .\node_modules .\build.zip -Update

echo ****************************** Deploying Script to Lambda ********************************
aws lambda update-function-code --function-name ems_pre_sign_up --zip-file fileb://build.zip
rmdir /s /q build


echo ********************************* Deployment Script End **********************************
echo ******************************************************************************************

