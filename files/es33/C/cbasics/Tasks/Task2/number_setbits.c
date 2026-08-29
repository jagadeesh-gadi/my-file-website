#include <stdio.h>

int main()
{
    unsigned int n;
    int count = 0;

    printf("Enter n decimal value: ");
    scanf("%x", &n);

    while (n != 0)
    {
        if (n & 1)
        {
            count++;
        }

        n = n >> 1;
    }

    printf("Number of set bits = %d\n", count);

    return 0;
}