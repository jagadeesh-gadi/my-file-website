// in an array elements which set of elements into binary and set even set bits and clear odd bits print elements
#include <stdio.h>
#define size 5
int main()
{
    int arr[size], i, j, temp;
    for (i = 0; i < 5; i++)
        scanf("%d", &arr[i]);

    for (i = 0; i < size; i++)
    {
        for (j = 0; j < 7; j++)
        {
            if (j % 2 == 0)
            {
                arr[i] |= (1 << j);
            }
            else
            {
                arr[i] &= ~(1 << j);
            }
        }
    }
    for (i = 0; i < size; i++)
    {
        printf("%X ", arr[i]);
    }
    printf("\n");
    return 0;
}