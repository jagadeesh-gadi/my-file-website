#include <stdio.h>

int main()
{
    int i, j, n;
    printf("enter valus for square pattern :: ");
    scanf("%d", &n);
    printf("\n");

    for (i = 0; i <= n; i++)
    {
        for (j = 1; j <= i; j++)
        {
            printf(" * ");
        }
        printf("\n");
    }

    return 0;
}