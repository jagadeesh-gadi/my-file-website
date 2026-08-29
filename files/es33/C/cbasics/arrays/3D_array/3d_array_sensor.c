#include <stdio.h>
#define block 2
#define row 3
#define col 4

int i, j, k, s1 = 0, s2 = 0;
void display(int arr[][row][col], int bl)
{
    for (i = 0; i < block; i++)
    {
        for (j = 0; j < row; j++)
        {
            for (k = 0; k < col; k++)
            {
                if (i == 0)
                    s1 += arr[i][j][k];
                else
                    s2 += arr[i][j][k];
            }
        }
    }
    printf("average of sensor1 and sensor 2 values :: \n");
    s1 = s1 / (row * col);
    printf("sensor1 average values ::%d\n", s1);
    s2 = s2 / (row * col);
    printf("sensor2 average values ::%d\n", s2);
}

int main()
{
    int arr[block][row][col];
    printf("enter the array  values ::\n");
    for (i = 0; i < block; i++)
    {
        for (j = 0; j < row; j++)
        {
            for (k = 0; k < col; k++)
            {
                scanf("%d", &arr[i][j][k]);
            }
        }
    }
    display(arr, block);

    return 0;
}