// program to print the next greatest element in an 2 arrays

#include <stdio.h>

int main()
{
    int arr[] = {4, 1, 2};
    int arr1[] = {1, 0, 4, 2};

    int n = sizeof(arr) / sizeof(arr[0]);
    int m = sizeof(arr1) / sizeof(arr1[0]);
    int i, j, flag = 0, k;
    for (i = 0; i < n; i++)
    {
        for (j = 0; j < m; j++)
        {
            if (arr[i] == arr1[j]) // comparing of 1st array and 2nd array
            {
                flag = 1;                   // if equalflag ==1  not 0
                for (k = j + 1; k < m; k++) // checking the array values using another variable
                {
                    if (arr1[k] > arr[i]) // checking the array of i greater than arry of j
                    {
                        printf("%d ", arr1[k]);
                        flag = 2; // if greater value then flag =2
                        break;
                    }
                }
                break;
            }
        }
        if (flag != 2) // if not equal to flag value then print the -1 not print the next value
        {
            printf("-1 ");
        }
    }

    return 0;
}