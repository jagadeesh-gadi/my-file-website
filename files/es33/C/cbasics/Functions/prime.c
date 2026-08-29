#include <stdio.h>

int prime(int a)
{
    int isprime;
    if (a < 0)
    {
        isprime = 0;
    }
    else
    {
        isprime = 1;

        for (int i = 2; i <= a/2; i++)
        {
            if (a % i == 0)
                isprime = 0;
            break;
        }
    }
    if (isprime)
        printf("number is prime\n");

    else
        printf("numbe is not prime \n");
}

int main()
{
    int b;
    scanf("%d", &b);
    prime(b);

    return 0;
}