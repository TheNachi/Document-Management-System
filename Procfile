"build:dist": "rimraf dist/ && babel ./ --out-dir dist/ --ignore ./node_modules,./server/test,./client/test,./screenshots,./reports,./migrations,./coverage,docs,testSetup.js --copy-files",
"start": "npm run build:dist && npm run webpack && node dist/server/index.js",
"webpack": "webpack --config ./webpack.conf.prod.js",