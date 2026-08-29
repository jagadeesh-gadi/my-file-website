
#include <stdio.h>

int main()
{
    int i, j;

    for (i = 1; i <= 10; i++)
        printf("%d", i);
    printf("\n");

    for (i = 1; i <= 9; i += 2)
        printf("%d", i);
    printf("\n");

    for (i = 1; i <= 9; i += 4)
        printf("%d", i);

    printf("\n");

    for (i = 5; i <= 5; i += 2)
        printf("%d", i);
    printf("\n");

    return 0;
}