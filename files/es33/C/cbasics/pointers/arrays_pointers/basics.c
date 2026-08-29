#include <stdio.h>

int main()
{
    int arr[30] = {10, 20, 30, 40, 50};
    int *p;
    int key = 30;
    p = arr;

    // fgets(arr, 30, stdin);
    while (*p != '\0') // p<arr+5
    {
        if (*p == key)
        {
            printf("%zu\n", p - arr);
        }
        p++;
    }

    return 0;
}