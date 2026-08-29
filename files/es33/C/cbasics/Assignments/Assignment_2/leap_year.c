#include <stdio.h>

int main()
{
    int year, n;
    scanf("%d", &year);

    if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))
    {
        printf("year is leap year\n");
    }
    else
    {
        printf("year is not leap year\n");
    }
    return 0;
}