#include <stdio.h>
#define size 5

int main()
{
    int arr[size], i, j, temp;
    for (i = 0; i < 5; i++)
        scanf("%d", &arr[i]);

    for (i = 0; i < size - 1; i++)
    {
        for (j = 0; j < (size - 1 - i); j++)
        {
            if (arr[j] > arr[j + 1])
            {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    printf("bubble sorting \n");
    for (i = 0; i < size; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
    return 0;
}