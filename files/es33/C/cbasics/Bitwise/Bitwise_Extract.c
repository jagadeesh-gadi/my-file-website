#include <stdio.h>
#include <stdint.h>
#include "Bitwise.h"

int main()
{
    uint8_t reg =0xD6;
     uint8_t value =(reg >> 4)& 0x0F;

    printf("reg value == 0x%X\n", reg);
    bit_pattern(reg);
    
    printf("value == 0x%X\n", value);

    bit_pattern(value);
}