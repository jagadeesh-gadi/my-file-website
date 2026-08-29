#include <stdio.h>
int findmax(int arr[], int n)
{
    int max = arr[0];
    for (int i = 0; i < n; i++)
    {
        if (arr[i] > max)
            max = arr[i];
    }
    return max;
}
int main()
{

    int arr[] = {10, 20, 40, 80, 50};
    int n = 5;
    findmax(arr, n);
    printf("%d\n", findmax(arr, n));
    return 0;
}