title: SVN 的备份与还原
tags:
  - svn backup
  - svn
  - svn 备份
  - svn 还原
date: 2017-09-06 11:09:56
---

其实很早之前就做了这个，但是最近公司要搬家所以又重新整理了一下 准备拿出来用上的，不过要用的那一天内网突然断了，所以也没有正式用，但是测试表明，十几个 svn 库，总体积三个多 g 备份的时候，只需要五分钟，超级快，保存了所有的提交记录。

```bat
@echo off
title SVN Backup by oli


:: ---------------------------------------
:: ---------------------------------------
:: ---------------------------------------

set SVN_HOME="C:\Program Files\VisualSVN Server"
:: 设置根目录
set SVN_ROOT=C:\Repositories
:: 设置要备份到的位置
set SVN_BACKUP_ROOT=C:\Backup

set TIME_DIR=%date:~,4%%date:~5,2%%date:~8,2%_%time:~,2%%time:~3,2%%time:~6,2%%time:~9,2%
set BACKUP_DIRECTORY=%SVN_BACKUP_ROOT%\%TIME_DIR%
set LOG=%BACKUP_DIRECTORY%\backup.log

:: ---------------------------------------
:: ---------------------------------------
:: ---------------------------------------

if not exist %SVN_HOME% goto error

goto start

:start
for /r %SVN_BACKUP_ROOT% %%I in (backup.log) do (
  if %%~zI GEQ 1048576 ren %LOG% backup_%TIME%.log
)

mkdir %BACKUP_DIRECTORY%
@echo [info] create new directory: %BACKUP_DIRECTORY%

@echo [info] %date:~,10% %time:~,2%:%time:~3,2%:%time:~6,2% create backup category: %BACKUP_DIRECTORY% >>%LOG%


for /d %%i in (%SVN_ROOT%\*) do (
  @echo [info] backup %%~ni >>%LOG%
  @echo [info] backup %%~ni

  :: --incremental
  %SVN_HOME%\bin\svnadmin dump %SVN_ROOT%\%%~ni > %BACKUP_DIRECTORY%\%%~ni.dmp 2>>%LOG%
)

@echo [info] %date:~,10% %time:~,2%:%time:~3,2%:%time:~6,2% finish: %errorlevel%
@echo [info] %date:~,10% %time:~,2%:%time:~3,2%:%time:~6,2% finish: %errorlevel% >>%LOG%

:error
echo [error] %date:~,10% %time:~,2%:%time:~3,2%:%time:~6,2% directory not exist，please check: %SVN_HOME%>>%LOG%
goto end

:end
@echo. >>%LOG%
:: exit

PAUSE
```

下面这一段是还原，就是把备份好的 dmp 文件，还原成文件夹。

还原的时候要根据自己是不是全新还原来考虑是否注释掉代码中的那一行~

```bat
echo off

title SVN Backup by oli

:: ---------------------------------------
:: ---------------------------------------
:: ---------------------------------------

set SVN_HOME="C:\Program Files\VisualSVN Server"

:: 要还原到的目录
set SVN_ROOT=C:\testLoad

:: 之前备份的目录
set SVN_BACKUP_DIR=C:\Backup\20170831_11282822

:: ---------------------------------------
:: ---------------------------------------
:: ---------------------------------------


if not exist %SVN_HOME% goto error

goto start

:start
for %%i in (%SVN_BACKUP_DIR%\*.dmp) do (
  @echo [info] backup %%~ni >>%LOG%
  @echo [info] backup %%~ni

  :: 目录不存在就新建一个否则会报错的，
  :: 如果全新还原这个目录必须新建，否则可以注释这一行
  %SVN_HOME%\bin\svnadmin create %SVN_ROOT%\%%~ni
  :: --incremental
  %SVN_HOME%\bin\svnadmin load %SVN_ROOT%\%%~ni < %SVN_BACKUP_DIR%\%%~ni.dmp
)

@echo [info] %date:~,10% %time:~,2%:%time:~3,2%:%time:~6,2% finish: %errorlevel%
@echo [info] %date:~,10% %time:~,2%:%time:~3,2%:%time:~6,2% finish: %errorlevel% >>%LOG%

:error
echo [error] %date:~,10% %time:~,2%:%time:~3,2%:%time:~6,2% SVNADMIN not exist, lease check: %SVN_HOME%>>%LOG%
goto end

:end
@echo. >>%LOG%
:: exit

PAUSE
```