#include <stdio.h>
#include <stdint.h>
#include "Bitwise.h"

int main()
{
    uint8_t reg;
    uint8_t value;

    scanf("%hhx %hhx", &reg, &value);

    bit_pattern(reg);
    bit_pattern(value);

    reg = (reg & 0x0F) | ((value & 0x0F) << 4);

    printf("updated == 0x%02X\n", reg);

    bit_pattern(reg);

    return 0;
}