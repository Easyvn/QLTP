set buildpath=%cd%\build
@REM @echo %buildpath%
cd ..
set topath=%cd%\qltp_backend\api\src\web-admin\build
@REM @echo %topath%

ROBOCOPY %buildpath% %topath% /S /MOVE /IS /IT /IM