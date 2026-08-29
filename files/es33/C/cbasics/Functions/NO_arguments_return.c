#include <stdio.h>

// sum of squares of all odd number in from upto n numbers
int sum()
{
    int s = 0, num, i;
    printf("enter value to print the some of all odd squares :: ");
    scanf("%d", &num);
    for (i = 1; i <= num; i++)
    {
        if (i % 2 != 0)

            s += i * i;
    }

    return s;
}
int main()
{
    printf("sum of squares of all odd values :: %d\n", sum());
}