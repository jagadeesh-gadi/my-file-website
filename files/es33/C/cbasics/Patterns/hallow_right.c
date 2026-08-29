// #include <stdio.h>

// int main()
// {
//     int i, j, n;
//     printf("enter valus for square pattern :: ");
//     scanf("%d", &n);

//     for (i = 1; i <= n; i++)
//     {
//         for (j = 1; j <= i; j++)
//         {
//             if (i == 1 || i == j || j == 1||i==n)
//                 printf("*");
//             else
//                 printf(" ");
//         }
//         printf("\n");
//     }

//     // for (i = n - 1; i >= 1; i--)
//     // {
//     //     for (j = 1; j <= i; j++)
//     //     {
//     //         if (i == 1 || i == j || j == 1)
//     //             printf("*");
//     //         else
//     //             printf(" ");
//     //     }
//     //     printf("\n");
//     // }

//     return 0;
// }

#include <stdio.h>

int main()
{
    int n;

    printf("Enter the number of rows: ");
    scanf("%d", &n);

    for (int i = n; i >= 1; i--)
    {
        // Print leading spaces
        for (int k = 0; k < n - i; k++)
        {
            printf("  ");
        }

        // Print stars
        for (int j = 1; j <= i; j++)
        {
            printf("* ");
        }

        printf("\n");
    }

    return 0;
}