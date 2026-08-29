#include <stdio.h>
#include <stdint.h>
#include "Bitwise.h"

// set nth bit
int set(unsigned int a, int n)
{
    a |= (1U << n);
    printf("set nth bit 0x%08x\n", a);
    bit_pattern(a);
}

// clear nth bit
int clear(unsigned int a, int n)
{
    a &= ~(1U << n);
    printf("clear nth bit 0x%08x\n", a);
    bit_pattern(a);
}
// toggle nth bit
int toggle(unsigned int a, int n)
{
    a ^= (1U << n);
    printf("toggle nth bit 0x%08x\n", a);
    bit_pattern(a);
}
int main()
{
    unsigned x;
    int y;
    scanf("%u%d", &x, &y);

    set(x, y);
    clear(x, y);
    toggle(x, y);
    return 0;
}