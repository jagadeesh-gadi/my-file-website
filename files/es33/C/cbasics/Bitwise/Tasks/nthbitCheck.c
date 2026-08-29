#include <stdio.h>
#include <stdint.h>
#include "Bitwise.h"

int main()
{
    uint8_t a;
    int n;

    scanf("%u %d", &a, &n);

    // Set nth bit
    a |= (1u << n);
    printf("Set nth bit :: 0x%08X\n", a);
    bit_pattern(a);

    // clear nth bit
    a &= ~(1u << n);
    printf("clear nth bit :: 0x%08X\n", a);
    bit_pattern(a);

    // toggle nth bit
    a ^= (1u << n);
    printf("Toggle nth bit :: 0x%08X\n", a);
    bit_pattern(a);

    // check nth bit
    if (a & (1u << n))
        printf("Set nth bit \n");
    else
        printf("bit was clear");

    return 0;
}