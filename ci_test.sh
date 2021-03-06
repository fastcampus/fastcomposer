#!/bin/bash
if npm run lint; then
	echo "Lint Success"
else
	echo "Lint Failed"
  exit 2
fi
export NODE_ENV=test
npm run serve &
if npm run test; then
  echo "Unit Test Success"
else
	echo "Unit Test Failed"
  #lsof -ti:8089 | xargs kill #kill auth npm run serve &
	exit 1
fi
if npm run test:e2e; then
  echo "E2E Test Success"
  lsof -ti:8080 | xargs kill
else
	echo "E2E Test Failed"
  lsof -ti:8080 | xargs kill #kill auth npm run serve &
	exit 1
fi
