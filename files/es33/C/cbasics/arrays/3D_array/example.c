#include <stdio.h>
#define block 2
#define row 3
#define column 4

int i, j, k;
void display(int arr[][row][column])
{
    printf("matrix values are  :: \n");
    for (i = 0; i < block; i++)
    {
        for (j = 0; j < row; j++)
        {
            for (k = 0; k < column; k++)
            {
                printf("%4d", arr[i][j][k]);
            }
            printf("\n");
        }
        printf("\n");
    }
}

int main()
{
    int arr[block][row][column];
    printf("enter the 3d array values :: \n");
    for (i = 0; i < block; i++)
    {
        for (j = 0; j < row; j++)
        {
            for (k = 0; k < column; k++)
            {
                scanf("%d", &arr[i][j][k]);
            }
        }
    }
    display(arr);
    return 0;
}