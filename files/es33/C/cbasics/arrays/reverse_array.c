#include <stdio.h>

int main()
{
    int n[5];
    int i;
    for (i = 0; i < 5; i++)
    {
        scanf("%d", &n[i]);
    }
    printf("reverse order\n");

    for (i = 4; i >= 0; i--)
    {
        printf("%d ", n[i]);
    }
    printf("\n");
    return 0;
}