#include <stdio.h>
int leap_year(year)
{
    int flag = 0;
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
    {
        if()
    }
    return flag;
}
int valid_month(month, maxdays)
{

    if (month != 2)
    {
        switch (month)
        {
        case '1':
        case '3':
        case '5':
        case '7':
        case '9':
        case '11':
            maxdays = 31;
            break;
        default:
        }
        else
        {
            switch (month)
            {
            case '4':
            case '6':
            case '8':
            case '10':
            case '12':
                printf("enterd month has 30 days\n");
                maxdays = 30;
                break;
            default:
            }
        }
        else
        {
            if (month == 2)
            {
                continue;
            }
            printf("enterd month is ");
        }
    }
}

    int main()
    {
        int day, month, year;
        printf("enter the day: %d// month: %d // year: %d\n");
        scanf("%d %d %d", &day, &month, &year);
        int fl = 0, a, b, maxdays = 0;
        if ((year <= 2026 && year >= 1900))
        {
            a = leap_year(year);
            b = valid_month(month, maxdays);
            if (a == 1)
            {
                maxdays = 29;
            }
            else
            {
                maxdays = 28;
            }
        }

        else
        {
            printf("enterd year is not in the range");
        }
    }
