// Move All Zeros to End using the arrys
// Use one pointer to find non-zero elements.

// Maintain another position where the next non-zero element should go.

#include <stdio.h>

void zeros(int *arr, int n)
{
    int pos = 0;
    int *p = arr;
    int temp;
    for (int i = 0; i < n; i++)
    {
        if (*(p + i) != 0)
        {
            temp = *(p + pos);
            *(p + pos) = *(p + i);
            *(p + i) = temp;
            pos++;
        }
    }
}

int main()
{
    int arr[] = {
        10,
        0,
        30,
        0,
        30,
        0,
        40,
        70,
    };
    zeros(arr, 8);
    for (int i = 0; i < 8; i++)
    {
        printf("%d ", arr[i]);
    }

    return 0;
}