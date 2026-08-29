#include <stdio.h>
#define size 5
int main()
{
    int arr[size], i, j, k, temp;
    for (i = 0; i < size; i++)
    {
        scanf("%d", &arr[i]);
    }
    for (k = 1; k < size; k++)
    {
        temp = arr[k];
        for (i = k - 1; temp < arr[i] && i >= 0; i--)
        {
            arr[i + 1] = arr[i];
            arr[i + 1] = temp;
        }
    }
    printf("sorrted array \n");
    for (int i = 0; i < size; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}