// Check whether a number is divisible by 5 or 7.
#include <stdio.h>

int main()
{
    int n;
    scanf("%d", &n);
    if (n % 5 == 0 || n % 7 == 0)
    {
        printf("divisible by %d\n", n);
    }
    else
        printf("not divisible by %d\n", n);
    return 0;
}