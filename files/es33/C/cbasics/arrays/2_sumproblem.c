#include <stdio.h>

int main()
{
    int arr[] = {1, 2, 5, 7, 8, 10};
    int t = 12, j, i;
    int n = sizeof(arr) / sizeof(arr[0]);
    for (i = 0, j = 1 + 1; i < j; j++, i++)
    {
        // for (j = i + 1; j < n; j++)
        // {
        if ((arr[i] + arr[j]) == t)
            printf("%d, %d", i, j);
        break;
    }
    // }

    return 0;
}