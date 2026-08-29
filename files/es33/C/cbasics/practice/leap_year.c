// Write a program to determine whether a year is a leap year using logical operators.
#include <stdio.h>

int main()
{
    int n;
    scanf("%d", &n);
    if (n % 4 == 0 || n % 400 == 0 && n % 100 != 0)
    {
        printf("leap year\n");
    }
    else
    {
        printf("not a leap year\n");
    }
    return 0;
}