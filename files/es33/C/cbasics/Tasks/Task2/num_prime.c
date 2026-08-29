#include <stdio.h>

int main()
{

    int n, num = 2, i, count = 0, isPrime;
    printf("enter number :: ");
    scanf("%d", &n);

    while (count < n)
    {
        isPrime = 1;

        for (i = 2; i * i <= num; i++)
        {
            if (num % i == 0)
            {
                isPrime = 0;
                break;
            }
        }

        if (isPrime)
        {
            printf("%d", num);
            printf("\n");
            count++;
        }

        num++;
    }

    return 0;
}
