#include <stdio.h>
#include <string.h>

void reverse(char *arr, char start, char end)
{
    if (start >= end)
        return;

    char temp;
    temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;

    reverse(arr, start + 1, end - 1);                         
}
int main()
{
    char str[] = "jagadeesh";
    int n = strlen(str);
    char start = 0, end = n - 1;
    reverse(str, start, end);
    printf("%s\n", str);
    return 0;
}