#include <stdio.h>

int main()
{
    int n, temp, num, rev = 0, rem, i;

    printf("Enter a number: ");
    scanf("%d", &n);
    for (i = 1; i <= n; i++)

    {
        temp = i;
        rev = 0;

        while (temp != 0)

        {
            rem = temp % 10;
            rev = rev * 10 + rem;
            temp = temp / 10;
        }

        if (rev == i)
        {
            printf("%d\n", i);
        }
    }

    return 0;
}