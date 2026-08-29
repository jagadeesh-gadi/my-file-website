// Write a program to check whether a number is divisible by both 3 and 5.
#include <stdio.h>

int main()
{
    int n;
    scanf("%d", &n);
    if (n % 3 == 0 && n % 5 == 0)
    {
        printf("divisible\n");
    }
    else
        printf("not divisible\n");
    return 0;
}