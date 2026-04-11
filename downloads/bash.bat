@echo off
title Command Prompt (Linux Edition)
goto prompt

:prompt
set /p bash=[%username%@%computername% ~]$ 
if bash==sdfnasnkdfmosdnfsdnfnsdjfsdifhsdifhsd8fhsdufywayfsd7afyas78dfysd78usdf goto command

:command
cmd /c %bash%
goto prompt