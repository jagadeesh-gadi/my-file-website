#include <stdio.h>

int main()
{
    int i, j, n, num;
    printf("enter num value :: ");
    scanf("%d", &num);

    // pascal_triangle code

    for (i = 0; i < num; i++)
    {
        n = 1;
        for (j = 0; j <= i; j++)
        {
            printf("%d", n);
            n = n * (i - j) / (j + 1);
        }
        printf("\n");
    }

    // for (i = 0; i < num; i++)
    // {
    //     for (int space = 0; space < num - i; space++) //(num - i)*2 by adding this line from right side it will print
    //     {
    //         printf(" ");
    //     }
    //     n = 1;
    //     for (j = 0; j <= i; j++)
    //     {
    //         printf("%d ",n);
    //         n = n * (i - j) / (j + 1);
    //     }

    //     printf("\n");
    // }

    return 0;
}