#include <stdio.h>
#define size 2
#define size1 3
int i, j;
void display(int arr[][size1], int rows)
{
    int l, sl;
    l = sl = arr[0][0];
    for (i = 0; i < size; i++)
    {
        for (j = 0; j < size1; j++)
        {

            if (arr[i][j] > l)
            {

                sl = l;
                l = arr[i][j];
            }
            else if (arr[i][j] > sl && arr[i][j] != l)
            {
                sl = arr[i][j];
            }
        }
    }
    printf("largest == %d\n", l);
    printf("second largest == %d\n", sl);
}
int main()
{
    int arr[size][size1];
    printf("enter the arr values :: \n");
    for (i = 0; i < size; i++)
    {
        for (j = 0; j < size1; j++)
        {
            scanf("%d", &arr[i][j]);
        }
    }
    display(arr, size1);
    return 0;
}