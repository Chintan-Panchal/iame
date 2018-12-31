#!/bin/bash

echo "Fixing swagger codegen tmpfix"
FILES=`find . -name *.service.ts | grep -service-modules | grep -v classes`

for FILE in $FILES; do
	echo "fixing $FILE"
	echo "}" >> $FILE
done
