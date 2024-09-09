#!/bin/bash
if [ $# -eq 0 ]
then
	echo "No arguments supplied";
	exit;
fi

if [ $# -gt 3 ]
then
	echo $1
	echo $2
	echo $3
else
	for i in "$@";
	do
     echo $i;
	done
fi
