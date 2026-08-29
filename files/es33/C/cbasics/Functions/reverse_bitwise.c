// reverse a number using the bitwise operator and print the reverse the bit

#include <stdio.h>
#include "Bitwise.h"
unsigned int reverse(unsigned int n)
{
    unsigned int rev = 0;
    printf("before the value of the : %d\n", n);
    bit_pattern(n);
    while (n)
    {

        rev = (rev << 1) | (n & 1);
        n = n >> 1;
    }
    printf("after reverse that value ::%d\n", rev);
    bit_pattern(rev);
}

int main()
{
    int n;
    scanf("%d", &n);
    reverse(n);
    return 0;
}