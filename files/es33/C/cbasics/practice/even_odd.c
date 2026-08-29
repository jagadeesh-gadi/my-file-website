// Check whether a number is even or odd using the % operator.
#include <stdio.h>

int main()
{
    int n;
    scanf("%d", &n);
    if (n % 2 == 0)
    {
        printf("even number\n");
    }
    else
    {
        printf("odd number\n");
    }
    return 0;
}