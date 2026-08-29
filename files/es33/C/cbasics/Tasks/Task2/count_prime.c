#include <stdio.h>

int main()
{
    int isprime, i, n, count = 0, num = 2;
    printf("enter n number :: ");
    scanf("%d", &n);

    while (count < n)
    {
        isprime = 1;

        for (i = 2; i * i <= num; i++)
        {
            if (num % 2 == 0)
            {
                isprime = 0;
                break;
            }
        }
        if (isprime)
        {
            printf("n prime numbers :: %d", num);

            count++;
            printf("\n");
        }

        num++;
    }
    printf("Total prime numbers = %d\n", count);
    return 0;
}