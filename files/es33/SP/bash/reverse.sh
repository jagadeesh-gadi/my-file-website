#!/bin/bash

echo "enter n value"

read n

while [ $n -gt 0 ]
do
	digit=$((n%10))
	rev=$((rev*10+digit))
	n=$((n/10))
done

echo "reverse number :: $rev"
