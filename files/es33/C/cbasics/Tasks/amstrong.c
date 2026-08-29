#include <stdio.h>
int main()
{

	int n, i, rem = 0, orginalnumber, temp, result = 0;
	scanf("%d", &n);

	orginalnumber = n;
	temp = n;
	while (temp != 0)
	{
		rem = temp % 10;
		result = result + (rem * rem * rem);
		temp = temp / 10;
	}
	if (result == orginalnumber)
	{
		printf("armstring\n");
	}
	else
	{
		printf("not armstrong\n");
	}
}
