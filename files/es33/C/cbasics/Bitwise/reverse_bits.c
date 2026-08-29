#include <stdio.h>

int main()
{
    int n, rev = 0, bits = 0;
    scanf("%d", &n);
    while (n)
    {
        rev = (rev << 1) | (n & 1);
        n >>= 1;
        bits++;
    }

    printf("Reversed bits: ");

    for (int i = bits - 1; i >= 0; i--)
    {
        printf("%d", (rev >> i) & 1);
    }

    printf("\n");

    return 0;
}