#include <stdio.h>
void reveres(int arr[], int n)
{
    int a;
    for (int i = 0, j = n - 1; i < j; i++, j--)
    {

        a = arr[i];
        arr[i] = arr[j];
        arr[j] = a;
    }
}
int main()
{
    int arr[] = {10, 20, 30, 40, 50};
    int n = sizeof(arr) / sizeof(arr[0]);
    reveres(arr, 5);
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    return 0;
}