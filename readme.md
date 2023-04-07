# Transpile Lambda for deployment 

Following these steps creates a zip file meant for Lambda deployment.

## NOTE: Make sure you cd into the correct path (ie. Travel-Planner-Backend/aws/lambdas/signup)


Automatic deploment to AWS WIP

## Mac
```npm run build``` 

This command should run fine

## Windows (using git bash)

Instructions found here:
https://stackoverflow.com/questions/38782928/how-to-add-man-and-zip-to-git-bash-installation-on-windows

1. Go to https://sourceforge.net/projects/gnuwin32/files/zip/3.0/
2. Install zip-3.0-bin.zip
3. Extract zip-3.0-bin.zip
4. Navigate to the extracted file bin folder and copy the zip.exe 
5. Navigate to your git bash's mingw64\bin folder <--- (ex. C:\Program Files\Git\mingw64\bin)
6. Paste the copied zip.exe file in there
7. Go to https://sourceforge.net/projects/gnuwin32/files/bzip2/1.0.5/
8. Install bzip2-1.0.5-bin.zip
9. Extract bzip2-1.0.5-bin.zip
10. Navigate to file's bin folder
11. Copy bzip2.dll
12. Navigate back to your git bash's mingw64\bin folder <--- (ex. C:\Program Files\Git\mingw64\bin)
13. Paste bzip2.dll

### Finally:
(from git bash terminal)
```npm run build``` 

# What's happening
Look inside Lambda's package.json and you see this command:
1. Deletes current dist folder
2. Bundles files
3. Creates a zip file

