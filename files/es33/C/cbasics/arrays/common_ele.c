// Find Common Elements in 2 arrays
#include <stdio.h>
void compare(int *arr, int n, int *arr2, int n1)
{
    int *p = arr;
    int *p1 = arr2;
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n1; j++)
        {
            if (*(p + i) == *(p1 + j))
            {
                printf("%d ", *(p + i));
                break;
            }
        }
    }
    printf("\n");
}

int main()
{
    int arr1[] = {
        10, 20, 30, 40, 50};
    int arr2[] = {20, 30, 50};
    compare(arr1, 5, arr2, 3);
    return 0;
}