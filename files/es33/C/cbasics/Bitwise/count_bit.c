// count the clear bit in the given number in that 8bits need to print and also count values are also need to print 8bit and count in 32bit values
#include <stdio.h>

int main()
{
    int n, mask;
    scanf("%d", &n);
    int count = 0;

    for (int i = 7; i >= 0; i--)
    {
        mask = (1 << i);
        if ((n & (mask)) == 0)
            printf("0");
        else
            printf("1");
    }
    printf("\n");
    n = 10;
    for (int i = 31; i >= 0; i--)
    {
        mask = (1 << i);

        if ((n & (mask)) == 0)
            count++;
    }
    printf("no of clear bits in 32 are :: %d\n", count);

    return 0;
}