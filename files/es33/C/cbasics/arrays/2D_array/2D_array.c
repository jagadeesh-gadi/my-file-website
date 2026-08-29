#include <stdio.h>
#define size 2
#define size1 3

int main()
{
    int arr[size][size1], i, j;
    for (i = 0; i < size; i++)
    {
        for (j = 0; j < size1; j++)
        {
            scanf("%d", &arr[i][j]);
        }
    }
    printf("2D array\n");
    for (i = 0; i < size; i++)
    {
        for (j = 0; j < size1; j++)
        {

            // printf("%4d", arr[i][j]);
            // verify the row-major memory layout

            printf("index = %d address = %p\n", arr[i][j], (void *)&arr[i][j]);
        }
        printf("\n");
    }
    // size verification
    printf("rows = %zu\n", sizeof(arr) / sizeof(arr[0]));
    printf("columns = %zu\n", sizeof(arr[0]) / sizeof(arr[0][0]));

    return 0;
}