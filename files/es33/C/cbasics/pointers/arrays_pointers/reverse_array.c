#include <stdio.h>
void strrev(int *arr)
{
    int *start = arr;
    int *end = arr + 4;
    int temp;
    while (start < end)
    {
        temp = *start;
        *start = *end;
        *end = temp;
        start++;
        end--;
    }
}

int main()
{
    int arr[] = {10, 20, 30, 40, 50};
    strrev(arr);
    for (int *p = arr; p < arr + 5; p++)
    {
        printf("%d\n", *p);
    }
    return 0;
}