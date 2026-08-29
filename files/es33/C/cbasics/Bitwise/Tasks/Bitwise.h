#ifndef MYHEADER_H
#define MYHEADER_H

#include <stdio.h>
void bit_pattern(int n)
{
    for (int i = 31; i >= 0; i--)
    {
        printf("%d", (n >> i) & 1);
        if (i % 4 == 0)
        {
            printf(" ");
        }
    }
    printf("\n");
}

#endif