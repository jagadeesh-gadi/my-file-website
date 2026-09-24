#include <stdio.h>

int main()
{
    int i = 0, j, a[20], n;
    int rem;

    printf("Enter decimal number: ");
    scanf("%d", &n);

    while (n > 0)
    {
        rem = n % 16;
        n = n / 16;

        if (rem < 10)
        {
            a[i] = rem + '0';
        }
        else
        {
            a[i] = rem + 'A' - 10;
        }

        i++;
    }

    printf("Hexadecimal = ");

    for (j = i - 1; j >= 0; j--)
    {
        printf("%c", a[j]);
    }

    printf("\n");

    return 0;
}