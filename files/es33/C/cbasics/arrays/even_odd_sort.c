// write a progam to sort the even number in single array and print the original arraya
// program to sort and array using the single array increasing order
#include <stdio.h>

int main()
{
    int i, j, n = 5;
    int arr1[n], temp;
    for (i = 0; i < 5; i++)
    {
        scanf("%d", &arr1[i]);
    }
    for (i = 0; i < 5; i++)
    {
        for (int j = i + 1; j < 5; j++)
        {
            if (arr1[i] > arr1[j] && arr1[i] % 2 == 0 && arr1[j] % 2 == 0)
            {
                temp = arr1[i];
                arr1[i] = arr1[j];
                arr1[j] = temp;
            }
        }
    }
    printf("sorrted array \n");
    for (int i = 0; i < 5; i++)
    {
        printf("%d ", arr1[i]);
    }
    printf("\n");
}