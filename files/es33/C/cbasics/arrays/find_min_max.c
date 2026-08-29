// // . Find Maximum and Minimum
// Question

// Find the largest and smallest elements in an array using a function and pointer.
#include <stdio.h>
void min_max(int *p, int n)
{
    int min = *p;
    int max = *p;
    for (int i = 0; i < n; i++)
    {
        p++;
        if (*p > max)
        {
            max = *p;
        }
        if (*p < min)
        {
            min = *p;
        }
    }
    printf("min :: %d", min);
    printf("max :: %d", max);
}
int main()
{
    int arr[] = {10, 40, 50, 90, 1, 500};

    min_max(arr, 6);
    return 0;
}