#include <stdio.h>

void compare(char *p1, char *p2)
{
    while (*p1 != '\0' || *p2 != '\0')
    {
        if (*p1 != *p2)
        {
            printf("Strings are not equal\n");
            return;
        }

        p1++;
        p2++;
    }

    printf("Strings are equal\n");
}

int main()
{
    char arr1[30];
    char arr2[20];
    fgets(arr1, 30, stdin);
    fgets(arr2, 20, stdin);
    compare(arr1, arr2);

    return 0;
}