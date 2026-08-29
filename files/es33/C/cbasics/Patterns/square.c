#include <stdio.h>

int main()
{
    int i, j, n;
    printf("enter valus for square pattern :: ");
    scanf("%d", &n);
    printf("\n");

    for (i = 0; i < n; i++)
    {
        for (j = 0; j < n; j++)
        {
            // if ((i + j) % 2 == 0)
            // {
            //     printf("1");
            // }
            // else
            //     printf("0");
            printf("*");
        }
        printf("\n");
    }

    return 0;
}