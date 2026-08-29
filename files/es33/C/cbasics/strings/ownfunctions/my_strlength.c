#include <stdio.h>
void length(char *str)
{
    int count = 0;
    char *p = str;
    while (*p != '\n')
    {
        count++;
        p++;
    }
    printf("length of string ::%d\n", count);
    printf("length of string ::%d\n", *p);
}

int main()
{
    char arr[30];
    fgets(arr, 30, stdin);
    length(arr);

    return 0;
}