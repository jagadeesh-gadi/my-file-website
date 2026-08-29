#include <stdio.h>

int main()
{

	int n, i, isprime;
	printf("enter number :: ");
	scanf("%d", &n);

	if (n <= 1)
	{

		isprime = 0;
	}
	else
	{
		isprime = 1;

		for (i = 2; i < n; i++)
		{
			if (n % i == 0)
			{
				isprime = 0;
				break;
			}
		}
	}

	if (isprime)
	{
		printf("prime nunber");
	}
	else
	{
		printf("not prime number");
	}

	return 0;
}
