#!/bin/bash

#if condition
num=5
if [ "$num" -gt 11 ]
then
        echo "number is grater"
else
	echo "number is smaller"
fi

#for loop
echo "for loop"
for i in 1 2 3 4 5
do
	echo "i=$i"
done

#while loop
echo "while loop"

i=1
while [ $i -le 5 ]
do
	echo "i=$i"
	 i=$((i+1))
done
