#include <stdio.h>
#include "Bitwise.h"

int main()
{
    unsigned char n, result;
    scanf("%c", &n);
    printf("before swapping :: %02x\n", n);
    bit_pattern(n);
    result =
        ((n & 0x0F) << 4) |
        ((n & 0xF0) >> 4);
    printf("after swapping :: %02x\n", result);
    bit_pattern(result);
    return 0;
}