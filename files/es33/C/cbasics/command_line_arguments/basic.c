#include <stdio.h>

int main(int a, char *ab[])
{
    int i;
    printf("a = %d \n", a);
    for (i = 0; i < a; i++)
    {
        printf("i[%d] = %s\n", i, ab[i]);
    }

    return 0;
}