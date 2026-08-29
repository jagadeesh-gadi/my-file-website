// stocks selling and busying problem
#include <stdio.h>

int main()
{
    int arr[] = {9, 2, 4, 8, 1};
    int profit = 0, j, i;
    int n = sizeof(arr) / sizeof(arr[0]);
    for (i = 0; i < n; i++)
    {
        for (j = i + 1; j < n; j++)
        {
            if ((arr[j] - arr[i]) > profit)
            {
                profit = arr[j] - arr[i];
            }
        }
    }
    printf("profit :: %d\n", profit);

    return 0;
}