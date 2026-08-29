#include <stdio.h>

int main()
{
    int arr[] = {10, 25, 30, 45, 15};
    int *p;
    p = arr;
    int largest = *p;

    for (int i = 0; i < 5; i++)
    {
        p++;
        if (*p > largest)
        {
            largest = *p;
        }
    }
    printf("largest number is :: %d\n", largest);
    return 0;
}