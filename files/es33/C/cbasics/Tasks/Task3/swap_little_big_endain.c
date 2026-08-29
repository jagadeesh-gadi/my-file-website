#include <stdio.h>

int main()
{
    unsigned int num, sum;
    scanf("%x", &num);
    sum =
        ((num & 0X000000FF) << 24) |
        ((num & 0x0000FF00) << 8) |
        ((num & 0x00FF0000) >> 8) |
        ((num & 0xFF000000) >> 24);

    printf("0x%08x\n", sum);

    return 0;
}