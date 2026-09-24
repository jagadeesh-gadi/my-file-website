#!/bin/bash

echo "enter 3 numbers"
read a b c

if [ $a -gt $b ] && [ $a -gt $c ]
then
	echo "$a is greater number"

elif [ $b -gt $c ]
then
	echo "$b is greater"
else
	echo "$c is greater"

fi
