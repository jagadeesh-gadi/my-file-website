#include <stdio.h>
int removeDuplicates(int arr[], int n)
{
    int k = 0;
    for (int i = 0; i < n; i++)
    {
        int found = 0;
        for (int j = i + 1; j < n; j++)
        {
            if (arr[i] == arr[j])
            {
                found = 1;
                break;
            }
        }
        if (found == 0)
        {
            arr[k] = arr[i];
            k++;
        }
    }
    return k;
}
int main()
{
    int arr[] = {
        10, 20, 30, 40, 50, 20, 40, 50};
    int n = sizeof(arr) / sizeof(arr[0]);

    n = removeDuplicates(arr, n);

    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }

    return 0;

    return 0;
}