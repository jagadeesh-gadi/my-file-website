#include <stdio.h>

int main()
{
    int a = 10;
    int b = 20;
    int c = 30;

    int *ptr[3];

    ptr[0] = &a;
    ptr[1] = &b;
    ptr[2] = &c;

    for (int i = 0; i < 3; i++)
    {
        printf("%-3d%d", i, *ptr[i]);
        printf("\tptr[%d]=%-5p *ptr[%d] =%-6d\n", i, (void *)(*ptr)[i], i, (*ptr)[i]);
    }
    return 0;
}