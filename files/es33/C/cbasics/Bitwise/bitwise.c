#include <stdio.h>
#include <stdint.h>
#include "Bitwise.h"

int main()
{
    unsigned char reg = 10;

    printf("%d\n", reg);
    bit_pattern(reg);
    reg = (reg << 2);
    printf("%d\n", reg);

    bit_pattern(reg);
}