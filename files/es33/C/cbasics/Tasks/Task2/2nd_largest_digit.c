#include <stdio.h>
#include <limits.h>

int main()
{

    int n, num, i;
    int largest = 0, second = 0, third = 0;
    scanf("%d", &n);
    while (n != 0)

    {
        num = n % 10;
        if (num > largest)
        {

            second = largest;
            largest = num;
        }
        else if (num > second && num != largest)
        {
            second = num;
        }
        else if (num > third && num != second && num != largest)
        {
            third = num;
        }

        n /= 10;
    }

    printf("Largest = %d\n", largest);
    printf("Second Largest = %d\n", second);
    printf("third Largest = %d\n", third);

    return 0;
}