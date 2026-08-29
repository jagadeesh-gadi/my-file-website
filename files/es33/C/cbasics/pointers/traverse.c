#include <stdio.h>
#include <string.h>

int main()
{
    char arr[20];
    int i = 0;
    scanf("%s", arr);
    char *ptr = arr;
    while (*ptr != '\0')
    {
        printf(" %c\n", *ptr);
        ptr++;
        i++;
    }
    printf("%d\n", i);

    return 0;
}