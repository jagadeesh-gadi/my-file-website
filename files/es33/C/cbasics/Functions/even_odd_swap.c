// count set bits at even positions and 1.clear even bits and 2.set odd bits

#include <stdio.h>
#include "Bitwise.h"
void setevenbit(int n)
{
    int count = 0;
    for (int i = 0; i <= 31; i++)
    {
        if (i % 2 == 0)
            n &= ~(1 << i);
        // n |= (1 << i);
        else
            n |= (1 << i);
        // n &= ~(1 << i);
    }
    printf("after the value is :: %X\n", n);
    bit_pattern(n);
}
int main()
{
    int x;
    printf("enter the hex decimal value:: ");
    scanf("%X", &x);
    setevenbit(x);
    return 0;
}