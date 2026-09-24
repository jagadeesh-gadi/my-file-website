#!/bin/bash
#compile command

gcc sensor.c -o sensor

#check compilitaion


if [ $? -ne 0 ]
then
	echo "compilation FAILD\n"
	exit 1
fi

echo "compilition SUCCESS"
output=$( ./sensor )
echo "program output : $output"

#test experted output

if [ "$output"="ALERT" ]
then
	echo "TEST PASSED"
else
	echo "TEST FAILD"
fi

