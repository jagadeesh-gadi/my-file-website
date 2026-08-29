#include <stdio.h>

int i, j;
void display(int arr[][4], int rows)
{
    printf("order of matrix using functions \n");
    for (i = 0; i < rows; i++)
    {
        for (j = 0; j < 4; j++)
        {
            printf("%5d", arr[i][j]);
        }
        printf("\n");
    }
}

int main()
{
    int arr[3][4];
    for (i = 0; i < 3; i++)
    {
        for (j = 0; j < 4; j++)
        {
            scanf("%d", &arr[i][j]);
        }
    }
    display(arr, 3);
    return 0;
}
