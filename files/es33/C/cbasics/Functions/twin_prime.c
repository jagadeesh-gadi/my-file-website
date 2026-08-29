#include <stdio.h>
int twin_prime(int n)
{
    scanf("%d", &n);
    int i = 3, j;
    if (n <= 1)
        return 0;
    for (i = 2; i < n; i++)
    {
        if (n % i == 0)
            return 0;
    }
    return 1;
}
int main()
{
    int a, b;
    scanf("%d %d", &a, &b);

    if ((a - b == 2 || b - a == 2) && twin_prime(a) && twin_prime(b))
    {
        printf("twin prime numbers \n ");
    }
    else
    {
        printf("not a twin primes\n");
    }
    return 0;
}