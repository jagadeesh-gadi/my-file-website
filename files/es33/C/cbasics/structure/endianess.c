#include <stdio.h>

int main()
{
    unsigned int x = 0x12345678;
    unsigned char *p = (unsigned char *)&x;
    printf("%02x\n", p[0]);
    return 0;
}